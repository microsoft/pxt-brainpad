var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pxsim;
(function (pxsim) {
    var input;
    (function (input) {
        function onGesture(gesture, handler) {
            var b = pxsim.accelerometer();
            b.accelerometer.activate();
            if (gesture == 11 /* ACCELEROMETER_EVT_SHAKE */ && !b.useShake) {
                b.useShake = true;
                pxsim.runtime.queueDisplayUpdate();
            }
            pxsim.pxtcore.registerWithDal(13 /* DEVICE_ID_GESTURE */, gesture, handler);
        }
        input.onGesture = onGesture;
        function rotation(kind) {
            var b = pxsim.accelerometer();
            var acc = b.accelerometer;
            acc.activate();
            var x = acc.getX(pxsim.MicroBitCoordinateSystem.NORTH_EAST_DOWN);
            var y = acc.getY(pxsim.MicroBitCoordinateSystem.NORTH_EAST_DOWN);
            var z = acc.getZ(pxsim.MicroBitCoordinateSystem.NORTH_EAST_DOWN);
            var roll = Math.atan2(y, z);
            var pitch = Math.atan(-x / (y * Math.sin(roll) + z * Math.cos(roll)));
            var r = 0;
            switch (kind) {
                case 0:
                    r = pitch;
                    break;
                case 1:
                    r = roll;
                    break;
            }
            return Math.floor(r / Math.PI * 180);
        }
        input.rotation = rotation;
        function setAccelerometerRange(range) {
            var b = pxsim.accelerometer();
            b.accelerometer.setSampleRange(range);
        }
        input.setAccelerometerRange = setAccelerometerRange;
        function acceleration(dimension) {
            var b = pxsim.accelerometer();
            var acc = b.accelerometer;
            acc.activate();
            switch (dimension) {
                case 0: return acc.getX();
                case 1: return acc.getY();
                case 2: return acc.getZ();
                default: return Math.floor(Math.sqrt(acc.instantaneousAccelerationSquared()));
            }
        }
        input.acceleration = acceleration;
    })(input = pxsim.input || (pxsim.input = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    /**
      * Co-ordinate systems that can be used.
      * RAW: Unaltered data. Data will be returned directly from the accelerometer.
      *
      * SIMPLE_CARTESIAN: Data will be returned based on an easy to understand alignment, consistent with the cartesian system taught in schools.
      * When held upright, facing the user:
      *
      *                            /
      *    +--------------------+ z
      *    |                    |
      *    |       .....        |
      *    | *     .....      * |
      * ^  |       .....        |
      * |  |                    |
      * y  +--------------------+  x-->
      *
      *
      * NORTH_EAST_DOWN: Data will be returned based on the industry convention of the North East Down (NED) system.
      * When held upright, facing the user:
      *
      *                            z
      *    +--------------------+ /
      *    |                    |
      *    |       .....        |
      *    | *     .....      * |
      * ^  |       .....        |
      * |  |                    |
      * x  +--------------------+  y-->
      *
      */
    (function (MicroBitCoordinateSystem) {
        MicroBitCoordinateSystem[MicroBitCoordinateSystem["RAW"] = 0] = "RAW";
        MicroBitCoordinateSystem[MicroBitCoordinateSystem["SIMPLE_CARTESIAN"] = 1] = "SIMPLE_CARTESIAN";
        MicroBitCoordinateSystem[MicroBitCoordinateSystem["NORTH_EAST_DOWN"] = 2] = "NORTH_EAST_DOWN";
    })(pxsim.MicroBitCoordinateSystem || (pxsim.MicroBitCoordinateSystem = {}));
    var MicroBitCoordinateSystem = pxsim.MicroBitCoordinateSystem;
    var Accelerometer = (function () {
        function Accelerometer(runtime) {
            this.runtime = runtime;
            this.sigma = 0; // the number of ticks that the instantaneous gesture has been stable.
            this.lastGesture = 0; // the last, stable gesture recorded.
            this.currentGesture = 0; // the instantaneous, unfiltered gesture detected.
            this.sample = { x: 0, y: 0, z: -1023 };
            this.shake = { x: false, y: false, z: false, count: 0, shaken: 0, timer: 0 }; // State information needed to detect shake events.
            this.isActive = false;
            this.sampleRange = 2;
            this.id = 5 /* DEVICE_ID_ACCELEROMETER */;
        }
        Accelerometer.prototype.setSampleRange = function (range) {
            this.activate();
            this.sampleRange = Math.max(1, Math.min(8, range));
        };
        Accelerometer.prototype.activate = function () {
            if (!this.isActive) {
                this.isActive = true;
                this.runtime.queueDisplayUpdate();
            }
        };
        /**
         * Reads the acceleration data from the accelerometer, and stores it in our buffer.
         * This is called by the tick() member function, if the interrupt is set!
         */
        Accelerometer.prototype.update = function (x, y, z) {
            // read MSB values...
            this.sample.x = Math.floor(x);
            this.sample.y = Math.floor(y);
            this.sample.z = Math.floor(z);
            // Update gesture tracking
            this.updateGesture();
            // Indicate that a new sample is available
            pxsim.board().bus.queue(this.id, 1 /* ACCELEROMETER_EVT_DATA_UPDATE */);
        };
        Accelerometer.prototype.instantaneousAccelerationSquared = function () {
            // Use pythagoras theorem to determine the combined force acting on the device.
            return this.sample.x * this.sample.x + this.sample.y * this.sample.y + this.sample.z * this.sample.z;
        };
        /**
         * Service function. Determines the best guess posture of the device based on instantaneous data.
         * This makes no use of historic data (except for shake), and forms this input to the filter implemented in updateGesture().
         *
         * @return A best guess of the current posture of the device, based on instantaneous data.
         */
        Accelerometer.prototype.instantaneousPosture = function () {
            var force = this.instantaneousAccelerationSquared();
            var shakeDetected = false;
            // Test for shake events.
            // We detect a shake by measuring zero crossings in each axis. In other words, if we see a strong acceleration to the left followed by
            // a string acceleration to the right, then we can infer a shake. Similarly, we can do this for each acxis (left/right, up/down, in/out).
            //
            // If we see enough zero crossings in succession (MICROBIT_ACCELEROMETER_SHAKE_COUNT_THRESHOLD), then we decide that the device
            // has been shaken.
            if ((this.getX() < -400 /* ACCELEROMETER_SHAKE_TOLERANCE */ && this.shake.x) || (this.getX() > 400 /* ACCELEROMETER_SHAKE_TOLERANCE */ && !this.shake.x)) {
                shakeDetected = true;
                this.shake.x = !this.shake.x;
            }
            if ((this.getY() < -400 /* ACCELEROMETER_SHAKE_TOLERANCE */ && this.shake.y) || (this.getY() > 400 /* ACCELEROMETER_SHAKE_TOLERANCE */ && !this.shake.y)) {
                shakeDetected = true;
                this.shake.y = !this.shake.y;
            }
            if ((this.getZ() < -400 /* ACCELEROMETER_SHAKE_TOLERANCE */ && this.shake.z) || (this.getZ() > 400 /* ACCELEROMETER_SHAKE_TOLERANCE */ && !this.shake.z)) {
                shakeDetected = true;
                this.shake.z = !this.shake.z;
            }
            if (shakeDetected && this.shake.count < 4 /* ACCELEROMETER_SHAKE_COUNT_THRESHOLD */ && ++this.shake.count == 4 /* ACCELEROMETER_SHAKE_COUNT_THRESHOLD */)
                this.shake.shaken = 1;
            if (++this.shake.timer >= 10 /* ACCELEROMETER_SHAKE_DAMPING */) {
                this.shake.timer = 0;
                if (this.shake.count > 0) {
                    if (--this.shake.count == 0)
                        this.shake.shaken = 0;
                }
            }
            if (this.shake.shaken)
                return 11 /* ACCELEROMETER_EVT_SHAKE */;
            var sq = function (n) { return n * n; };
            if (force < sq(400 /* ACCELEROMETER_FREEFALL_TOLERANCE */))
                return 7 /* ACCELEROMETER_EVT_FREEFALL */;
            if (force > sq(3072 /* ACCELEROMETER_3G_TOLERANCE */))
                return 8 /* ACCELEROMETER_EVT_3G */;
            if (force > sq(6144 /* ACCELEROMETER_6G_TOLERANCE */))
                return 9 /* ACCELEROMETER_EVT_6G */;
            if (force > sq(8192 /* ACCELEROMETER_8G_TOLERANCE */))
                return 10 /* ACCELEROMETER_EVT_8G */;
            // Determine our posture.
            if (this.getX() < (-1000 + 200 /* ACCELEROMETER_TILT_TOLERANCE */))
                return 3 /* ACCELEROMETER_EVT_TILT_LEFT */;
            if (this.getX() > (1000 - 200 /* ACCELEROMETER_TILT_TOLERANCE */))
                return 4 /* ACCELEROMETER_EVT_TILT_RIGHT */;
            if (this.getY() < (-1000 + 200 /* ACCELEROMETER_TILT_TOLERANCE */))
                return 1 /* ACCELEROMETER_EVT_TILT_UP */;
            if (this.getY() > (1000 - 200 /* ACCELEROMETER_TILT_TOLERANCE */))
                return 2 /* ACCELEROMETER_EVT_TILT_DOWN */;
            if (this.getZ() < (-1000 + 200 /* ACCELEROMETER_TILT_TOLERANCE */))
                return 5 /* ACCELEROMETER_EVT_FACE_UP */;
            if (this.getZ() > (1000 - 200 /* ACCELEROMETER_TILT_TOLERANCE */))
                return 6 /* ACCELEROMETER_EVT_FACE_DOWN */;
            return 0;
        };
        Accelerometer.prototype.updateGesture = function () {
            // Determine what it looks like we're doing based on the latest sample...
            var g = this.instantaneousPosture();
            // Perform some low pass filtering to reduce jitter from any detected effects
            if (g == this.currentGesture) {
                if (this.sigma < 5 /* ACCELEROMETER_GESTURE_DAMPING */)
                    this.sigma++;
            }
            else {
                this.currentGesture = g;
                this.sigma = 0;
            }
            // If we've reached threshold, update our record and raise the relevant event...
            if (this.currentGesture != this.lastGesture && this.sigma >= 5 /* ACCELEROMETER_GESTURE_DAMPING */) {
                this.lastGesture = this.currentGesture;
                pxsim.board().bus.queue(13 /* DEVICE_ID_GESTURE */, this.lastGesture);
            }
        };
        /**
          * Reads the X axis value of the latest update from the accelerometer.
          * @param system The coordinate system to use. By default, a simple cartesian system is provided.
          * @return The force measured in the X axis, in milli-g.
          *
          * Example:
          * @code
          * uBit.accelerometer.getX();
          * uBit.accelerometer.getX(RAW);
          * @endcode
          */
        Accelerometer.prototype.getX = function (system) {
            if (system === void 0) { system = MicroBitCoordinateSystem.SIMPLE_CARTESIAN; }
            this.activate();
            var val;
            switch (system) {
                case MicroBitCoordinateSystem.SIMPLE_CARTESIAN:
                    val = -this.sample.x;
                case MicroBitCoordinateSystem.NORTH_EAST_DOWN:
                    val = this.sample.y;
                //case MicroBitCoordinateSystem.SIMPLE_CARTESIAN.RAW:
                default:
                    val = this.sample.x;
            }
            return pxsim.board().invertAccelerometerXAxis ? val * -1 : val;
        };
        /**
          * Reads the Y axis value of the latest update from the accelerometer.
          * @param system The coordinate system to use. By default, a simple cartesian system is provided.
          * @return The force measured in the Y axis, in milli-g.
          *
          * Example:
          * @code
          * uBit.accelerometer.getY();
          * uBit.accelerometer.getY(RAW);
          * @endcode
          */
        Accelerometer.prototype.getY = function (system) {
            if (system === void 0) { system = MicroBitCoordinateSystem.SIMPLE_CARTESIAN; }
            this.activate();
            var val;
            switch (system) {
                case MicroBitCoordinateSystem.SIMPLE_CARTESIAN:
                    val = -this.sample.y;
                case MicroBitCoordinateSystem.NORTH_EAST_DOWN:
                    val = -this.sample.x;
                //case RAW:
                default:
                    val = this.sample.y;
            }
            return pxsim.board().invertAccelerometerYAxis ? val * -1 : val;
        };
        /**
          * Reads the Z axis value of the latest update from the accelerometer.
          * @param system The coordinate system to use. By default, a simple cartesian system is provided.
          * @return The force measured in the Z axis, in milli-g.
          *
          * Example:
          * @code
          * uBit.accelerometer.getZ();
          * uBit.accelerometer.getZ(RAW);
          * @endcode
          */
        Accelerometer.prototype.getZ = function (system) {
            if (system === void 0) { system = MicroBitCoordinateSystem.SIMPLE_CARTESIAN; }
            this.activate();
            var val;
            switch (system) {
                case MicroBitCoordinateSystem.NORTH_EAST_DOWN:
                    val = -this.sample.z;
                //case MicroBitCoordinateSystem.SIMPLE_CARTESIAN:
                //case MicroBitCoordinateSystem.RAW:
                default:
                    val = this.sample.z;
            }
            return pxsim.board().invertAccelerometerZAxis ? val * -1 : val;
        };
        /**
          * Provides a rotation compensated pitch of the device, based on the latest update from the accelerometer.
          * @return The pitch of the device, in degrees.
          *
          * Example:
          * @code
          * uBit.accelerometer.getPitch();
          * @endcode
          */
        Accelerometer.prototype.getPitch = function () {
            this.activate();
            return Math.floor((360 * this.getPitchRadians()) / (2 * Math.PI));
        };
        Accelerometer.prototype.getPitchRadians = function () {
            this.recalculatePitchRoll();
            return this.pitch;
        };
        /**
          * Provides a rotation compensated roll of the device, based on the latest update from the accelerometer.
          * @return The roll of the device, in degrees.
          *
          * Example:
          * @code
          * uBit.accelerometer.getRoll();
          * @endcode
          */
        Accelerometer.prototype.getRoll = function () {
            this.activate();
            return Math.floor((360 * this.getRollRadians()) / (2 * Math.PI));
        };
        Accelerometer.prototype.getRollRadians = function () {
            this.recalculatePitchRoll();
            return this.roll;
        };
        /**
         * Recalculate roll and pitch values for the current sample.
         * We only do this at most once per sample, as the necessary trigonemteric functions are rather
         * heavyweight for a CPU without a floating point unit...
         */
        Accelerometer.prototype.recalculatePitchRoll = function () {
            var x = this.getX(MicroBitCoordinateSystem.NORTH_EAST_DOWN);
            var y = this.getY(MicroBitCoordinateSystem.NORTH_EAST_DOWN);
            var z = this.getZ(MicroBitCoordinateSystem.NORTH_EAST_DOWN);
            this.roll = Math.atan2(y, z);
            this.pitch = Math.atan(-x / (y * Math.sin(this.roll) + z * Math.cos(this.roll)));
        };
        return Accelerometer;
    }());
    pxsim.Accelerometer = Accelerometer;
    var AccelerometerState = (function () {
        function AccelerometerState(runtime) {
            this.useShake = false;
            this.accelerometer = new Accelerometer(runtime);
        }
        return AccelerometerState;
    }());
    pxsim.AccelerometerState = AccelerometerState;
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    function accelerometer() {
        return pxsim.board().accelerometerState;
    }
    pxsim.accelerometer = accelerometer;
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var control;
    (function (control) {
        control.runInBackground = pxsim.thread.runInBackground;
        control.delay = pxsim.thread.pause;
        function reset() {
            pxsim.U.userError("reset not implemented in simulator yet");
        }
        control.reset = reset;
        function waitMicros(micros) {
            pxsim.thread.pause(micros / 1000); // it prempts not much we can do here.
        }
        control.waitMicros = waitMicros;
        function deviceName() {
            var b = pxsim.board();
            return b && b.id
                ? b.id.slice(0, 4)
                : "abcd";
        }
        control.deviceName = deviceName;
        function deviceSerialNumber() {
            var b = pxsim.board();
            return parseInt(b && b.id
                ? b.id.slice(1)
                : "42");
        }
        control.deviceSerialNumber = deviceSerialNumber;
        function deviceDalVersion() {
            return "0.0.0";
        }
        control.deviceDalVersion = deviceDalVersion;
        function onEvent(id, evid, handler) {
            pxsim.pxtcore.registerWithDal(id, evid, handler);
        }
        control.onEvent = onEvent;
        function waitForEvent(id, evid) {
            var cb = pxsim.getResume();
            pxsim.board().bus.wait(id, evid, cb);
        }
        control.waitForEvent = waitForEvent;
        function allocateNotifyEvent() {
            var b = pxsim.board();
            return b.bus.nextNotifyEvent++;
        }
        control.allocateNotifyEvent = allocateNotifyEvent;
        function raiseEvent(id, evid, mode) {
            // TODO mode?
            pxsim.board().bus.queue(id, evid);
        }
        control.raiseEvent = raiseEvent;
        function millis() {
            return pxsim.runtime.runningTime();
        }
        control.millis = millis;
        function delayMicroseconds(us) {
            control.delay(us / 0.001);
        }
        control.delayMicroseconds = delayMicroseconds;
    })(control = pxsim.control || (pxsim.control = {}));
})(pxsim || (pxsim = {}));
/// <reference path="../../../node_modules/pxt-core/built/pxtsim.d.ts" />
var pxsim;
(function (pxsim) {
    function board() {
        return pxsim.runtime.board;
    }
    pxsim.board = board;
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var pxtcore;
    (function (pxtcore) {
        // TODO: add in support for mode, as in CODAL
        function registerWithDal(id, evid, handler, mode) {
            if (mode === void 0) { mode = 0; }
            pxsim.board().bus.listen(id, evid, handler);
        }
        pxtcore.registerWithDal = registerWithDal;
        function getPin(id) {
            return pxsim.board().edgeConnectorState.getPin(id);
        }
        pxtcore.getPin = getPin;
    })(pxtcore = pxsim.pxtcore || (pxsim.pxtcore = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var loops;
    (function (loops) {
        loops.pause = pxsim.thread.pause;
        loops.forever = pxsim.thread.forever;
    })(loops = pxsim.loops || (pxsim.loops = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var serial;
    (function (serial) {
        function writeString(str) {
            console.log(str);
            pxsim.runtime.board.writeSerial(str);
        }
        serial.writeString = writeString;
        function writeBuffer(buffer) {
            // NOP, can't simulate
        }
        serial.writeBuffer = writeBuffer;
    })(serial = pxsim.serial || (pxsim.serial = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var ThresholdState;
    (function (ThresholdState) {
        ThresholdState[ThresholdState["High"] = 0] = "High";
        ThresholdState[ThresholdState["Low"] = 1] = "Low";
        ThresholdState[ThresholdState["Normal"] = 2] = "Normal";
    })(ThresholdState || (ThresholdState = {}));
    var AnalogSensorState = (function () {
        function AnalogSensorState(id, min, max, lowThreshold, highThreshold) {
            if (min === void 0) { min = 0; }
            if (max === void 0) { max = 255; }
            if (lowThreshold === void 0) { lowThreshold = 64; }
            if (highThreshold === void 0) { highThreshold = 192; }
            this.id = id;
            this.min = min;
            this.max = max;
            this.lowThreshold = lowThreshold;
            this.highThreshold = highThreshold;
            this.sensorUsed = false;
            this.state = ThresholdState.Normal;
            this.level = Math.ceil((max - min) / 2);
        }
        AnalogSensorState.prototype.setUsed = function () {
            if (!this.sensorUsed) {
                this.sensorUsed = true;
                pxsim.runtime.queueDisplayUpdate();
            }
        };
        AnalogSensorState.prototype.setLevel = function (level) {
            this.level = this.clampValue(level);
            if (this.level >= this.highThreshold) {
                this.setState(ThresholdState.High);
            }
            else if (this.level <= this.lowThreshold) {
                this.setState(ThresholdState.Low);
            }
            else {
                this.setState(ThresholdState.Normal);
            }
        };
        AnalogSensorState.prototype.getLevel = function () {
            return this.level;
        };
        AnalogSensorState.prototype.setLowThreshold = function (value) {
            this.lowThreshold = this.clampValue(value);
            this.highThreshold = Math.max(this.lowThreshold + 1, this.highThreshold);
        };
        AnalogSensorState.prototype.setHighThreshold = function (value) {
            this.highThreshold = this.clampValue(value);
            this.lowThreshold = Math.min(this.highThreshold - 1, this.lowThreshold);
        };
        AnalogSensorState.prototype.clampValue = function (value) {
            if (value < this.min) {
                return this.min;
            }
            else if (value > this.max) {
                return this.max;
            }
            return value;
        };
        AnalogSensorState.prototype.setState = function (state) {
            if (this.state === state) {
                return;
            }
            this.state = state;
            switch (state) {
                case ThresholdState.High:
                    pxsim.board().bus.queue(this.id, 2 /* ANALOG_THRESHOLD_HIGH */);
                    break;
                case ThresholdState.Low:
                    pxsim.board().bus.queue(this.id, 1 /* ANALOG_THRESHOLD_LOW */);
                    break;
                case ThresholdState.Normal:
                    break;
            }
        };
        return AnalogSensorState;
    }());
    pxsim.AnalogSensorState = AnalogSensorState;
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var pins;
    (function (pins) {
        var CommonPin = (function (_super) {
            __extends(CommonPin, _super);
            function CommonPin() {
                _super.apply(this, arguments);
            }
            return CommonPin;
        }(pxsim.Pin));
        pins.CommonPin = CommonPin;
        var DigitalPin = (function (_super) {
            __extends(DigitalPin, _super);
            function DigitalPin() {
                _super.apply(this, arguments);
            }
            return DigitalPin;
        }(CommonPin));
        pins.DigitalPin = DigitalPin;
        var AnalogPin = (function (_super) {
            __extends(AnalogPin, _super);
            function AnalogPin() {
                _super.apply(this, arguments);
            }
            return AnalogPin;
        }(CommonPin));
        pins.AnalogPin = AnalogPin;
        function markUsed(name) {
            if (!name.used) {
                name.used = true;
                pxsim.runtime.queueDisplayUpdate();
            }
        }
        pins.markUsed = markUsed;
    })(pins = pxsim.pins || (pxsim.pins = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var DigitalPinMethods;
    (function (DigitalPinMethods) {
        function digitalRead(name) {
            return name.digitalReadPin();
        }
        DigitalPinMethods.digitalRead = digitalRead;
        /**
        * Set a pin or connector value to either 0 or 1.
        * @param value value to set on the pin, 1 eg,0
        */
        function digitalWrite(name, value) {
            name.digitalWritePin(value);
        }
        DigitalPinMethods.digitalWrite = digitalWrite;
        /**
        * Configures this pin to a digital input, and generates events where the timestamp is the duration
        * that this pin was either ``high`` or ``low``.
        */
        function onPulsed(name, pulse, body) {
            // NOP, can't simulate
        }
        DigitalPinMethods.onPulsed = onPulsed;
        /**
        * Returns the duration of a pulse in microseconds
        * @param value the value of the pulse (default high)
        * @param maximum duration in micro-seconds
        */
        function pulseIn(name, pulse, maxDuration) {
            if (maxDuration === void 0) { maxDuration = 2000000; }
            // Always return default value, can't simulate
            return 500;
        }
        DigitalPinMethods.pulseIn = pulseIn;
        /**
        * Configures the pull of this pin.
        * @param pull one of the mbed pull configurations: PullUp, PullDown, PullNone
        */
        function setPull(name, pull) {
            name.setPull(pull);
        }
        DigitalPinMethods.setPull = setPull;
        /**
        * Do something when a pin is pressed.
        * @param body the code to run when the pin is pressed
        */
        function onPressed(name, body) {
        }
        DigitalPinMethods.onPressed = onPressed;
        /**
         * Do something when a pin is released.
         * @param body the code to run when the pin is released
         */
        function onReleased(name, body) {
        }
        DigitalPinMethods.onReleased = onReleased;
        /**
         * Get the pin state (pressed or not). Requires to hold the ground to close the circuit.
         * @param name pin used to detect the touch
         */
        function isPressed(name) {
            return name.isTouched();
        }
        DigitalPinMethods.isPressed = isPressed;
    })(DigitalPinMethods = pxsim.DigitalPinMethods || (pxsim.DigitalPinMethods = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var AnalogPinMethods;
    (function (AnalogPinMethods) {
        /**
         * Read the connector value as analog, that is, as a value comprised between 0 and 1023.
         */
        function analogRead(name) {
            pxsim.pins.markUsed(name);
            return name.analogReadPin();
        }
        AnalogPinMethods.analogRead = analogRead;
        /**
         * Set the connector value as analog. Value must be comprised between 0 and 1023.
         * @param value value to write to the pin between ``0`` and ``1023``. eg:1023,0
         */
        function analogWrite(name, value) {
            pxsim.pins.markUsed(name);
            name.analogWritePin(value);
        }
        AnalogPinMethods.analogWrite = analogWrite;
        /**
         * Configures the Pulse-width modulation (PWM) of the analog output to the given value in
         * **microseconds** or `1/1000` milliseconds.
         * If this pin is not configured as an analog output (using `analog write pin`), the operation has
         * no effect.
         * @param micros period in micro seconds. eg:20000
         */
        function analogSetPeriod(name, micros) {
            pxsim.pins.markUsed(name);
            name.analogSetPeriod(micros);
        }
        AnalogPinMethods.analogSetPeriod = analogSetPeriod;
        /**
         * Writes a value to the servo, controlling the shaft accordingly. On a standard servo, this will
         * set the angle of the shaft (in degrees), moving the shaft to that orientation. On a continuous
         * rotation servo, this will set the speed of the servo (with ``0`` being full-speed in one
         * direction, ``180`` being full speed in the other, and a value near ``90`` being no movement).
         * @param value angle or rotation speed, eg:180,90,0
         */
        function servoWrite(name, value) {
            pxsim.pins.markUsed(name);
            name.servoWritePin(value);
        }
        AnalogPinMethods.servoWrite = servoWrite;
        /**
         * Configures this IO pin as an analog/pwm output, configures the period to be 20 ms, and sets the
         * pulse width, based on the value it is given **microseconds** or `1/1000` milliseconds.
         * @param micros pulse duration in micro seconds, eg:1500
         */
        function servoSetPulse(name, micros) {
            pxsim.pins.markUsed(name);
            // TODO fix pxt
            // name.servoSetPulse(micros);
        }
        AnalogPinMethods.servoSetPulse = servoSetPulse;
    })(AnalogPinMethods = pxsim.AnalogPinMethods || (pxsim.AnalogPinMethods = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var PwmPinMethods;
    (function (PwmPinMethods) {
        function analogSetPeriod(name, micros) {
            name.analogSetPeriod(micros);
        }
        PwmPinMethods.analogSetPeriod = analogSetPeriod;
        function servoWrite(name, value) {
            name.servoWritePin(value);
        }
        PwmPinMethods.servoWrite = servoWrite;
        function servoSetPulse(name, micros) {
            name.servoSetPulse(name.id, micros);
        }
        PwmPinMethods.servoSetPulse = servoSetPulse;
    })(PwmPinMethods = pxsim.PwmPinMethods || (pxsim.PwmPinMethods = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var pins;
    (function (pins) {
        function pulseDuration() {
            // bus last event timestamp
            return 500;
        }
        pins.pulseDuration = pulseDuration;
        function createBuffer(sz) {
            return pxsim.BufferMethods.createBuffer(sz);
        }
        pins.createBuffer = createBuffer;
        function i2cReadBuffer(address, size, repeat) {
            // fake reading zeros
            return createBuffer(size);
        }
        pins.i2cReadBuffer = i2cReadBuffer;
        function i2cWriteBuffer(address, buf, repeat) {
            // fake - noop
        }
        pins.i2cWriteBuffer = i2cWriteBuffer;
    })(pins = pxsim.pins || (pxsim.pins = {}));
})(pxsim || (pxsim = {}));
/// <reference path="../../core/dal.d.ts"/>
var pxsim;
(function (pxsim) {
    var DOUBLE_CLICK_TIME = 500;
    var CommonButton = (function (_super) {
        __extends(CommonButton, _super);
        function CommonButton() {
            _super.apply(this, arguments);
            this._pressedTime = -1;
            this._clickedTime = -1;
        }
        CommonButton.prototype.setPressed = function (p) {
            if (this.pressed === p) {
                return;
            }
            this.pressed = p;
            if (p) {
                this._wasPressed = true;
                pxsim.board().bus.queue(this.id, 1 /* DEVICE_BUTTON_EVT_DOWN */);
                this._pressedTime = pxsim.runtime.runningTime();
            }
            else if (this._pressedTime !== -1) {
                pxsim.board().bus.queue(this.id, 2 /* DEVICE_BUTTON_EVT_UP */);
                var current = pxsim.runtime.runningTime();
                if (current - this._pressedTime >= 1000 /* DEVICE_BUTTON_LONG_CLICK_TIME */) {
                    pxsim.board().bus.queue(this.id, 4 /* DEVICE_BUTTON_EVT_LONG_CLICK */);
                }
                else {
                    pxsim.board().bus.queue(this.id, 3 /* DEVICE_BUTTON_EVT_CLICK */);
                }
                if (this._clickedTime !== -1) {
                    if (current - this._clickedTime <= DOUBLE_CLICK_TIME) {
                        pxsim.board().bus.queue(this.id, 6 /* DEVICE_BUTTON_EVT_DOUBLE_CLICK */);
                    }
                }
                this._clickedTime = current;
            }
        };
        CommonButton.prototype.wasPressed = function () {
            var temp = this._wasPressed;
            this._wasPressed = false;
            return temp;
        };
        CommonButton.prototype.isPressed = function () {
            return this.pressed;
        };
        return CommonButton;
    }(pxsim.Button));
    pxsim.CommonButton = CommonButton;
    var CommonButtonState = (function () {
        function CommonButtonState(buttons) {
            this.usesButtonAB = false;
            this.buttonsByPin = {};
            this.buttons = buttons || [
                new CommonButton(1 /* DEVICE_ID_BUTTON_A */),
                new CommonButton(2 /* DEVICE_ID_BUTTON_B */),
                new CommonButton(3 /* DEVICE_ID_BUTTON_AB */)
            ];
        }
        return CommonButtonState;
    }());
    pxsim.CommonButtonState = CommonButtonState;
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var pxtcore;
    (function (pxtcore) {
        function getButtonByPin(pinId) {
            var m = pxsim.board().buttonState.buttonsByPin;
            var b = m[pinId + ""];
            if (!b) {
                b = m[pinId + ""] = new pxsim.CommonButton(pinId);
            }
            return b;
        }
        pxtcore.getButtonByPin = getButtonByPin;
        function getButton(buttonId) {
            var buttons = pxsim.board().buttonState.buttons;
            if (buttonId === 2) {
                pxsim.board().buttonState.usesButtonAB = true;
                pxsim.runtime.queueDisplayUpdate();
            }
            if (buttonId < buttons.length && buttonId >= 0) {
                return buttons[buttonId];
            }
            // panic
            return undefined;
        }
        pxtcore.getButton = getButton;
    })(pxtcore = pxsim.pxtcore || (pxsim.pxtcore = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var ButtonMethods;
    (function (ButtonMethods) {
        function onEvent(button, ev, body) {
            pxsim.pxtcore.registerWithDal(button.id, ev, body);
        }
        ButtonMethods.onEvent = onEvent;
        function isPressed(button) {
            return button.pressed;
        }
        ButtonMethods.isPressed = isPressed;
        function wasPressed(button) {
            return button.wasPressed();
        }
        ButtonMethods.wasPressed = wasPressed;
    })(ButtonMethods = pxsim.ButtonMethods || (pxsim.ButtonMethods = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var DigitalPinMethods;
    (function (DigitalPinMethods) {
        function pushButton(pin) {
            return pxsim.pxtcore.getButtonByPin(pin.id);
        }
        DigitalPinMethods.pushButton = pushButton;
    })(DigitalPinMethods = pxsim.DigitalPinMethods || (pxsim.DigitalPinMethods = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var NeoPixelMode;
    (function (NeoPixelMode) {
        NeoPixelMode[NeoPixelMode["RGB"] = 1] = "RGB";
        NeoPixelMode[NeoPixelMode["RGBW"] = 2] = "RGBW";
        NeoPixelMode[NeoPixelMode["RGB_RGB"] = 3] = "RGB_RGB";
    })(NeoPixelMode || (NeoPixelMode = {}));
    var CommonNeoPixelState = (function () {
        function CommonNeoPixelState() {
            this.mode = NeoPixelMode.RGB; // GRB
        }
        Object.defineProperty(CommonNeoPixelState.prototype, "length", {
            get: function () {
                return this.buffer ? (this.buffer.length / this.stride) >> 0 : 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CommonNeoPixelState.prototype, "stride", {
            get: function () {
                return this.mode == NeoPixelMode.RGBW ? 4 : 3;
            },
            enumerable: true,
            configurable: true
        });
        CommonNeoPixelState.prototype.pixelColor = function (pixel) {
            var offset = pixel * this.stride;
            switch (this.mode) {
                case NeoPixelMode.RGBW:
                    return [this.buffer[offset + 1], this.buffer[offset], this.buffer[offset + 2], this.buffer[offset + 3]];
                case NeoPixelMode.RGB_RGB:
                    return [this.buffer[offset], this.buffer[offset + 1], this.buffer[offset + 2]];
                default:
                    return [this.buffer[offset + 1], this.buffer[offset + 0], this.buffer[offset + 2]];
            }
        };
        return CommonNeoPixelState;
    }());
    pxsim.CommonNeoPixelState = CommonNeoPixelState;
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var light;
    (function (light) {
        // Currently only modifies the builtin pixels
        function sendBuffer(pin, mode, b) {
            var state = pxsim.neopixelState(pin.id);
            state.mode = mode; // TODO RGBW support
            state.buffer = b.data;
            pxsim.runtime.queueDisplayUpdate();
        }
        light.sendBuffer = sendBuffer;
        function defaultPin() {
            return pxsim.board().defaultNeopixelPin();
        }
        light.defaultPin = defaultPin;
    })(light = pxsim.light || (pxsim.light = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    function neopixelState(pinId) {
        return pxsim.board().neopixelState(pinId);
    }
    pxsim.neopixelState = neopixelState;
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var input;
    (function (input) {
        function lightLevel() {
            var b = pxsim.lightSensorState();
            b.setUsed();
            return b.getLevel();
        }
        input.lightLevel = lightLevel;
        function onLightConditionChanged(condition, body) {
            var b = pxsim.lightSensorState();
            b.setUsed();
            pxsim.pxtcore.registerWithDal(b.id, condition, body);
        }
        input.onLightConditionChanged = onLightConditionChanged;
        function setLightThreshold(condition, value) {
            var b = pxsim.lightSensorState();
            b.setUsed();
            switch (condition) {
                case 1 /* ANALOG_THRESHOLD_LOW */:
                    b.setLowThreshold(value);
                    break;
                case 2 /* ANALOG_THRESHOLD_HIGH */:
                    b.setHighThreshold(value);
                    break;
            }
        }
        input.setLightThreshold = setLightThreshold;
    })(input = pxsim.input || (pxsim.input = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    function lightSensorState() {
        return pxsim.board().lightSensorState;
    }
    pxsim.lightSensorState = lightSensorState;
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var input;
    (function (input) {
        function soundLevel() {
            var b = pxsim.microphoneState();
            b.setUsed();
            return b.getLevel();
        }
        input.soundLevel = soundLevel;
        function onLoudSound(body) {
            var b = pxsim.microphoneState();
            b.setUsed();
            pxsim.pxtcore.registerWithDal(b.id, 2 /* LEVEL_THRESHOLD_HIGH */, body);
        }
        input.onLoudSound = onLoudSound;
        function setLoudSoundThreshold(value) {
            var b = pxsim.microphoneState();
            b.setUsed();
            b.setHighThreshold(value);
        }
        input.setLoudSoundThreshold = setLoudSoundThreshold;
    })(input = pxsim.input || (pxsim.input = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    function microphoneState() {
        return pxsim.board().microphoneState;
    }
    pxsim.microphoneState = microphoneState;
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var AudioState = (function () {
        function AudioState() {
            this.outputDestination_ = 0;
            this.volume = 100;
            this.playing = false;
        }
        AudioState.prototype.startPlaying = function () {
            this.playing = true;
        };
        AudioState.prototype.stopPlaying = function () {
            this.playing = false;
        };
        AudioState.prototype.isPlaying = function () {
            return this.playing;
        };
        return AudioState;
    }());
    pxsim.AudioState = AudioState;
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var music;
    (function (music) {
        function noteFrequency(note) {
            return note;
        }
        music.noteFrequency = noteFrequency;
        function setOutput(mode) {
            var audioState = pxsim.getAudioState();
            audioState.outputDestination_ = mode;
        }
        music.setOutput = setOutput;
        function setVolume(volume) {
            var audioState = pxsim.getAudioState();
            audioState.volume = Math.max(0, 1024, volume * 4);
        }
        music.setVolume = setVolume;
        function setPitchPin(pin) {
            var audioState = pxsim.getAudioState();
            audioState.pitchPin_ = pin;
        }
        music.setPitchPin = setPitchPin;
        function setTone(buffer) {
            // TODO: implement set tone in the audio context
        }
        music.setTone = setTone;
        function playTone(frequency, ms) {
            var b = pxsim.board();
            if (!b)
                return;
            var audioState = pxsim.getAudioState();
            var currentOutput = audioState.outputDestination_;
            audioState.startPlaying();
            pxsim.runtime.queueDisplayUpdate();
            pxsim.AudioContextManager.tone(frequency, 1);
            var cb = pxsim.getResume();
            if (ms <= 0)
                cb();
            else {
                setTimeout(function () {
                    pxsim.AudioContextManager.stop();
                    audioState.stopPlaying();
                    pxsim.runtime.queueDisplayUpdate();
                    cb();
                }, ms);
            }
        }
        music.playTone = playTone;
        function getPitchPin() {
            var audioState = pxsim.getAudioState();
            if (!audioState.pitchPin_) {
                audioState.pitchPin_ = pxsim.board().getDefaultPitchPin();
            }
            return audioState.pitchPin_;
        }
    })(music = pxsim.music || (pxsim.music = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    function getAudioState() {
        return pxsim.board().audioState;
    }
    pxsim.getAudioState = getAudioState;
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var SlideSwitchState = (function () {
        function SlideSwitchState() {
            this.left = false;
        }
        SlideSwitchState.prototype.setState = function (left) {
            if (this.left === left) {
                return;
            }
            else if (left) {
                pxsim.board().bus.queue(SlideSwitchState.id, 2 /* DEVICE_BUTTON_EVT_UP */);
            }
            else {
                pxsim.board().bus.queue(SlideSwitchState.id, 1 /* DEVICE_BUTTON_EVT_DOWN */);
            }
            this.left = left;
        };
        SlideSwitchState.prototype.isLeft = function () {
            return this.left;
        };
        SlideSwitchState.id = 3000 /*DEVICE_ID_BUTTON_SLIDE*/;
        return SlideSwitchState;
    }());
    pxsim.SlideSwitchState = SlideSwitchState;
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var input;
    (function (input) {
        function onSwitchMoved(direction, body) {
            pxsim.pxtcore.registerWithDal(pxsim.SlideSwitchState.id, direction, body);
        }
        input.onSwitchMoved = onSwitchMoved;
        function switchRight() {
            var b = pxsim.board();
            var sw = b.slideSwitchState;
            return !sw.isLeft();
        }
        input.switchRight = switchRight;
    })(input = pxsim.input || (pxsim.input = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    function thermometerState() {
        return pxsim.board().thermometerState;
    }
    pxsim.thermometerState = thermometerState;
    function setThermometerUnit(unit) {
        pxsim.board().thermometerUnitState = unit;
    }
    pxsim.setThermometerUnit = setThermometerUnit;
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    (function (TemperatureUnit) {
        TemperatureUnit[TemperatureUnit["Celsius"] = 0] = "Celsius";
        TemperatureUnit[TemperatureUnit["Fahrenheit"] = 1] = "Fahrenheit";
    })(pxsim.TemperatureUnit || (pxsim.TemperatureUnit = {}));
    var TemperatureUnit = pxsim.TemperatureUnit;
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var input;
    (function (input) {
        function temperature(unit) {
            var b = pxsim.thermometerState();
            b.setUsed();
            pxsim.setThermometerUnit(unit);
            var deg = b.getLevel();
            return unit == pxsim.TemperatureUnit.Celsius ? deg
                : ((deg * 18) / 10 + 32) >> 0;
        }
        input.temperature = temperature;
        function onTemperatureConditionChanged(condition, temperature, unit, body) {
            var b = pxsim.thermometerState();
            b.setUsed();
            pxsim.setThermometerUnit(unit);
            var t = unit == pxsim.TemperatureUnit.Celsius
                ? temperature
                : (((temperature - 32) * 10) / 18 >> 0);
            if (condition === 2 /* ANALOG_THRESHOLD_HIGH */) {
                b.setHighThreshold(t);
            }
            else {
                b.setLowThreshold(t);
            }
            pxsim.pxtcore.registerWithDal(b.id, condition, body);
        }
        input.onTemperatureConditionChanged = onTemperatureConditionChanged;
    })(input = pxsim.input || (pxsim.input = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var CapacitiveSensorState = (function () {
        function CapacitiveSensorState(mapping) {
            this.capacity = [];
            this.reading = [];
            this.mapping = mapping;
        }
        CapacitiveSensorState.prototype.getCap = function (pinId) {
            return this.mapping[pinId];
        };
        CapacitiveSensorState.prototype.readCap = function (pinId, samples) {
            var capId = this.getCap(pinId);
            return this.capacitiveSensor(capId, samples);
        };
        CapacitiveSensorState.prototype.isReadingPin = function (pinId, pin) {
            var capId = this.getCap(pinId);
            return this.reading[capId];
        };
        CapacitiveSensorState.prototype.isReading = function (capId) {
            return this.reading[capId];
        };
        CapacitiveSensorState.prototype.startReading = function (pinId, pin) {
            var capId = this.getCap(pinId);
            this.reading[capId] = true;
            pin.mode = pxsim.PinFlags.Analog | pxsim.PinFlags.Input;
            pin.mode |= pxsim.PinFlags.Analog;
        };
        CapacitiveSensorState.prototype.capacitiveSensor = function (capId, samples) {
            return this.capacity[capId] || 0;
        };
        CapacitiveSensorState.prototype.reset = function (capId) {
            this.capacity[capId] = 0;
            this.reading[capId] = false;
        };
        return CapacitiveSensorState;
    }());
    pxsim.CapacitiveSensorState = CapacitiveSensorState;
    var TouchButton = (function (_super) {
        __extends(TouchButton, _super);
        function TouchButton(pin) {
            _super.call(this, pin);
        }
        TouchButton.prototype.setThreshold = function (value) {
        };
        TouchButton.prototype.value = function () {
            return 0;
        };
        return TouchButton;
    }(pxsim.CommonButton));
    pxsim.TouchButton = TouchButton;
    var TouchButtonState = (function () {
        function TouchButtonState(pins) {
            this.buttons = pins.map(function (pin) { return new TouchButton(pin); });
        }
        return TouchButtonState;
    }());
    pxsim.TouchButtonState = TouchButtonState;
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var pxtcore;
    (function (pxtcore) {
        function getTouchButton(index) {
            var state = pxsim.board().touchButtonState;
            var btn = state.buttons.filter(function (b) { return b.id == index; })[0];
            if (btn) {
                pxtcore.getPin(btn.id).used = true;
                pxsim.runtime.queueDisplayUpdate();
            }
            return btn;
        }
        pxtcore.getTouchButton = getTouchButton;
    })(pxtcore = pxsim.pxtcore || (pxsim.pxtcore = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var TouchButtonMethods;
    (function (TouchButtonMethods) {
        function setThreshold(button, value) {
            button.setThreshold(value);
        }
        TouchButtonMethods.setThreshold = setThreshold;
        function value(button) {
            return button.value();
        }
        TouchButtonMethods.value = value;
    })(TouchButtonMethods = pxsim.TouchButtonMethods || (pxsim.TouchButtonMethods = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var AnalogPinMethods;
    (function (AnalogPinMethods) {
        function touchButton(name) {
            return pxsim.pxtcore.getTouchButton(name.id);
        }
        AnalogPinMethods.touchButton = touchButton;
    })(AnalogPinMethods = pxsim.AnalogPinMethods || (pxsim.AnalogPinMethods = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var network;
    (function (network) {
        function cableSendPacket(buf) {
            var state = pxsim.getCableState();
            state.send(buf);
        }
        network.cableSendPacket = cableSendPacket;
        function cablePacket() {
            var state = pxsim.getCableState();
            return pxsim.incr(state.packet);
        }
        network.cablePacket = cablePacket;
        function onCablePacket(body) {
            var state = pxsim.getCableState();
            state.listen(body);
        }
        network.onCablePacket = onCablePacket;
        function onCableError(body) {
            var state = pxsim.getCableState();
            state.listenError(body);
        }
        network.onCableError = onCableError;
    })(network = pxsim.network || (pxsim.network = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var CableState = (function () {
        function CableState() {
            // notify view that a packet was received
            this.packetReceived = false;
            // PULSE_IR_COMPONENT_ID = 0x2042;
            this.PULSE_CABLE_COMPONENT_ID = 0x2043;
            this.PULSE_PACKET_EVENT = 0x2;
            this.PULSE_PACKET_ERROR_EVENT = 0x3;
        }
        CableState.prototype.send = function (buf) {
            pxsim.Runtime.postMessage({
                type: "irpacket",
                packet: buf.data
            });
        };
        CableState.prototype.listen = function (body) {
            pxsim.pxtcore.registerWithDal(this.PULSE_CABLE_COMPONENT_ID, this.PULSE_PACKET_EVENT, body);
        };
        CableState.prototype.listenError = function (body) {
            pxsim.pxtcore.registerWithDal(this.PULSE_CABLE_COMPONENT_ID, this.PULSE_PACKET_ERROR_EVENT, body);
        };
        CableState.prototype.receive = function (buf) {
            pxsim.decr(this.packet);
            this.packet = buf;
            pxsim.incr(this.packet);
            this.packetReceived = true;
            pxsim.board().bus.queue(this.PULSE_CABLE_COMPONENT_ID, this.PULSE_PACKET_EVENT);
        };
        return CableState;
    }());
    pxsim.CableState = CableState;
    function getCableState() {
        return pxsim.board().cableState;
    }
    pxsim.getCableState = getCableState;
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var network;
    (function (network) {
        function infraredSendPacket(buf) {
            var state = pxsim.getInfraredState();
            state.send(buf);
        }
        network.infraredSendPacket = infraredSendPacket;
        function infraredPacket() {
            var state = pxsim.getInfraredState();
            return pxsim.incr(state.packet);
        }
        network.infraredPacket = infraredPacket;
        function onInfraredPacket(body) {
            var state = pxsim.getInfraredState();
            state.listen(body);
        }
        network.onInfraredPacket = onInfraredPacket;
        function onInfraredError(body) {
            var state = pxsim.getInfraredState();
            state.listenError(body);
        }
        network.onInfraredError = onInfraredError;
    })(network = pxsim.network || (pxsim.network = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var InfraredState = (function () {
        function InfraredState() {
            // notify view that a packet was received
            this.packetReceived = false;
            this.IR_COMPONENT_ID = 0x2042;
            this.IR_PACKET_EVENT = 0x2;
            this.IR_PACKET_ERROR_EVENT = 0x3;
        }
        InfraredState.prototype.send = function (buf) {
            pxsim.Runtime.postMessage({
                type: "irpacket",
                packet: buf.data
            });
        };
        InfraredState.prototype.listen = function (body) {
            pxsim.pxtcore.registerWithDal(this.IR_COMPONENT_ID, this.IR_PACKET_EVENT, body);
        };
        InfraredState.prototype.listenError = function (body) {
            pxsim.pxtcore.registerWithDal(this.IR_COMPONENT_ID, this.IR_PACKET_ERROR_EVENT, body);
        };
        InfraredState.prototype.receive = function (buf) {
            pxsim.decr(this.packet);
            this.packet = buf;
            pxsim.incr(this.packet);
            this.packetReceived = true;
            pxsim.board().bus.queue(this.IR_COMPONENT_ID, this.IR_PACKET_EVENT);
        };
        return InfraredState;
    }());
    pxsim.InfraredState = InfraredState;
    function getInfraredState() {
        return pxsim.board().irState;
    }
    pxsim.getInfraredState = getInfraredState;
})(pxsim || (pxsim = {}));
