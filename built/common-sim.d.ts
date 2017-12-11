/// <reference path="../node_modules/pxt-core/built/pxtsim.d.ts" />
/// <reference path="../libs/core/dal.d.ts" />
declare namespace pxsim.input {
    function onGesture(gesture: number, handler: RefAction): void;
    function rotation(kind: number): number;
    function setAccelerometerRange(range: number): void;
    function acceleration(dimension: number): number;
}
declare namespace pxsim {
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
    enum MicroBitCoordinateSystem {
        RAW = 0,
        SIMPLE_CARTESIAN = 1,
        NORTH_EAST_DOWN = 2,
    }
    class Accelerometer {
        runtime: Runtime;
        private sigma;
        private lastGesture;
        private currentGesture;
        private sample;
        private shake;
        private pitch;
        private roll;
        private id;
        isActive: boolean;
        sampleRange: number;
        constructor(runtime: Runtime);
        setSampleRange(range: number): void;
        activate(): void;
        /**
         * Reads the acceleration data from the accelerometer, and stores it in our buffer.
         * This is called by the tick() member function, if the interrupt is set!
         */
        update(x: number, y: number, z: number): void;
        instantaneousAccelerationSquared(): number;
        /**
         * Service function. Determines the best guess posture of the device based on instantaneous data.
         * This makes no use of historic data (except for shake), and forms this input to the filter implemented in updateGesture().
         *
         * @return A best guess of the current posture of the device, based on instantaneous data.
         */
        private instantaneousPosture();
        updateGesture(): void;
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
        getX(system?: MicroBitCoordinateSystem): number;
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
        getY(system?: MicroBitCoordinateSystem): number;
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
        getZ(system?: MicroBitCoordinateSystem): number;
        /**
          * Provides a rotation compensated pitch of the device, based on the latest update from the accelerometer.
          * @return The pitch of the device, in degrees.
          *
          * Example:
          * @code
          * uBit.accelerometer.getPitch();
          * @endcode
          */
        getPitch(): number;
        getPitchRadians(): number;
        /**
          * Provides a rotation compensated roll of the device, based on the latest update from the accelerometer.
          * @return The roll of the device, in degrees.
          *
          * Example:
          * @code
          * uBit.accelerometer.getRoll();
          * @endcode
          */
        getRoll(): number;
        getRollRadians(): number;
        /**
         * Recalculate roll and pitch values for the current sample.
         * We only do this at most once per sample, as the necessary trigonemteric functions are rather
         * heavyweight for a CPU without a floating point unit...
         */
        recalculatePitchRoll(): void;
    }
    class AccelerometerState {
        accelerometer: Accelerometer;
        useShake: boolean;
        constructor(runtime: Runtime);
    }
}
declare namespace pxsim {
    interface AccelerometerBoard extends CommonBoard {
        accelerometerState: AccelerometerState;
        invertAccelerometerXAxis?: boolean;
        invertAccelerometerYAxis?: boolean;
        invertAccelerometerZAxis?: boolean;
    }
    function accelerometer(): AccelerometerState;
}
declare namespace pxsim.control {
    let runInBackground: typeof thread.runInBackground;
    let delay: typeof thread.pause;
    function reset(): void;
    function waitMicros(micros: number): void;
    function deviceName(): string;
    function deviceSerialNumber(): number;
    function deviceDalVersion(): string;
    function onEvent(id: number, evid: number, handler: RefAction): void;
    function waitForEvent(id: number, evid: number): void;
    function allocateNotifyEvent(): number;
    function raiseEvent(id: number, evid: number, mode: number): void;
    function millis(): number;
    function delayMicroseconds(us: number): void;
}
declare namespace pxsim {
    interface CommonBoard extends CoreBoard {
        id: string;
        buttonState: CommonButtonState;
        edgeConnectorState: EdgeConnectorState;
    }
    function board(): CommonBoard;
}
declare namespace pxsim.pxtcore {
    function registerWithDal(id: number, evid: number, handler: RefAction, mode?: number): void;
    function getPin(id: number): pxsim.Pin;
}
declare namespace pxsim.loops {
    let pause: typeof thread.pause;
    let forever: typeof thread.forever;
}
declare namespace pxsim.serial {
    function writeString(str: string): void;
    function writeBuffer(buffer: any): void;
}
declare namespace pxsim {
    class AnalogSensorState {
        id: number;
        private min;
        private max;
        private lowThreshold;
        private highThreshold;
        sensorUsed: boolean;
        private level;
        private state;
        constructor(id: number, min?: number, max?: number, lowThreshold?: number, highThreshold?: number);
        setUsed(): void;
        setLevel(level: number): void;
        getLevel(): number;
        setLowThreshold(value: number): void;
        setHighThreshold(value: number): void;
        private clampValue(value);
        private setState(state);
    }
}
declare namespace pxsim.pins {
    class CommonPin extends Pin {
        used: boolean;
    }
    class DigitalPin extends CommonPin {
    }
    class AnalogPin extends CommonPin {
    }
    function markUsed(name: CommonPin): void;
}
declare namespace pxsim.DigitalPinMethods {
    function digitalRead(name: pins.DigitalPin): number;
    /**
    * Set a pin or connector value to either 0 or 1.
    * @param value value to set on the pin, 1 eg,0
    */
    function digitalWrite(name: pins.DigitalPin, value: number): void;
    /**
    * Configures this pin to a digital input, and generates events where the timestamp is the duration
    * that this pin was either ``high`` or ``low``.
    */
    function onPulsed(name: pins.DigitalPin, pulse: number, body: RefAction): void;
    /**
    * Returns the duration of a pulse in microseconds
    * @param value the value of the pulse (default high)
    * @param maximum duration in micro-seconds
    */
    function pulseIn(name: pins.DigitalPin, pulse: number, maxDuration?: number): number;
    /**
    * Configures the pull of this pin.
    * @param pull one of the mbed pull configurations: PullUp, PullDown, PullNone
    */
    function setPull(name: pins.DigitalPin, pull: number): void;
    /**
    * Do something when a pin is pressed.
    * @param body the code to run when the pin is pressed
    */
    function onPressed(name: pins.DigitalPin, body: RefAction): void;
    /**
     * Do something when a pin is released.
     * @param body the code to run when the pin is released
     */
    function onReleased(name: pins.DigitalPin, body: RefAction): void;
    /**
     * Get the pin state (pressed or not). Requires to hold the ground to close the circuit.
     * @param name pin used to detect the touch
     */
    function isPressed(name: pins.DigitalPin): boolean;
}
declare namespace pxsim.AnalogPinMethods {
    /**
     * Read the connector value as analog, that is, as a value comprised between 0 and 1023.
     */
    function analogRead(name: pins.AnalogPin): number;
    /**
     * Set the connector value as analog. Value must be comprised between 0 and 1023.
     * @param value value to write to the pin between ``0`` and ``1023``. eg:1023,0
     */
    function analogWrite(name: pins.AnalogPin, value: number): void;
    /**
     * Configures the Pulse-width modulation (PWM) of the analog output to the given value in
     * **microseconds** or `1/1000` milliseconds.
     * If this pin is not configured as an analog output (using `analog write pin`), the operation has
     * no effect.
     * @param micros period in micro seconds. eg:20000
     */
    function analogSetPeriod(name: pins.AnalogPin, micros: number): void;
    /**
     * Writes a value to the servo, controlling the shaft accordingly. On a standard servo, this will
     * set the angle of the shaft (in degrees), moving the shaft to that orientation. On a continuous
     * rotation servo, this will set the speed of the servo (with ``0`` being full-speed in one
     * direction, ``180`` being full speed in the other, and a value near ``90`` being no movement).
     * @param value angle or rotation speed, eg:180,90,0
     */
    function servoWrite(name: pins.AnalogPin, value: number): void;
    /**
     * Configures this IO pin as an analog/pwm output, configures the period to be 20 ms, and sets the
     * pulse width, based on the value it is given **microseconds** or `1/1000` milliseconds.
     * @param micros pulse duration in micro seconds, eg:1500
     */
    function servoSetPulse(name: pins.AnalogPin, micros: number): void;
}
declare namespace pxsim.PwmPinMethods {
    function analogSetPeriod(name: pins.AnalogPin, micros: number): void;
    function servoWrite(name: pins.AnalogPin, value: number): void;
    function servoSetPulse(name: pins.AnalogPin, micros: number): void;
}
declare namespace pxsim.pins {
    function pulseDuration(): number;
    function createBuffer(sz: number): RefBuffer;
    function i2cReadBuffer(address: number, size: number, repeat?: boolean): RefBuffer;
    function i2cWriteBuffer(address: number, buf: RefBuffer, repeat?: boolean): void;
}
declare namespace pxsim {
    class CommonButton extends Button {
        private _pressedTime;
        private _clickedTime;
        private _wasPressed;
        setPressed(p: boolean): void;
        wasPressed(): boolean;
        isPressed(): boolean;
    }
    class CommonButtonState {
        usesButtonAB: boolean;
        buttons: CommonButton[];
        buttonsByPin: Map<CommonButton>;
        constructor(buttons?: CommonButton[]);
    }
}
declare namespace pxsim.pxtcore {
    function getButtonByPin(pinId: number): Button;
    function getButton(buttonId: number): Button;
}
declare namespace pxsim.ButtonMethods {
    function onEvent(button: pxsim.Button, ev: number, body: pxsim.RefAction): void;
    function isPressed(button: pxsim.Button): boolean;
    function wasPressed(button: pxsim.Button): boolean;
}
declare namespace pxsim.DigitalPinMethods {
    function pushButton(pin: pins.DigitalPin): Button;
}
declare namespace pxsim {
    class CommonNeoPixelState {
        buffer: Uint8Array;
        mode: number;
        length: number;
        stride: number;
        pixelColor(pixel: number): number[];
    }
    interface CommonNeoPixelStateConstructor {
        (pin: Pin): CommonNeoPixelState;
    }
}
declare namespace pxsim.light {
    function sendBuffer(pin: pins.DigitalPin, mode: number, b: RefBuffer): void;
    function defaultPin(): Pin;
}
declare namespace pxsim {
    interface LightBoard extends CommonBoard {
        tryGetNeopixelState(pinId: number): CommonNeoPixelState;
        neopixelState(pinId: number): CommonNeoPixelState;
        defaultNeopixelPin(): Pin;
    }
    function neopixelState(pinId: number): CommonNeoPixelState;
}
declare namespace pxsim.input {
    function lightLevel(): number;
    function onLightConditionChanged(condition: number, body: RefAction): void;
    function setLightThreshold(condition: number, value: number): void;
}
declare namespace pxsim {
    interface LightSensorBoard extends CommonBoard {
        lightSensorState: AnalogSensorState;
    }
    function lightSensorState(): AnalogSensorState;
}
declare namespace pxsim.input {
    function soundLevel(): number;
    function onLoudSound(body: RefAction): void;
    function setLoudSoundThreshold(value: number): void;
}
declare namespace pxsim {
    interface MicrophoneBoard extends CommonBoard {
        microphoneState: AnalogSensorState;
    }
    function microphoneState(): AnalogSensorState;
}
declare namespace pxsim {
    class AudioState {
        private playing;
        outputDestination_: number;
        pitchPin_: Pin;
        volume: number;
        constructor();
        startPlaying(): void;
        stopPlaying(): void;
        isPlaying(): boolean;
    }
}
declare namespace pxsim.music {
    function noteFrequency(note: number): number;
    function setOutput(mode: number): void;
    function setVolume(volume: number): void;
    function setPitchPin(pin: Pin): void;
    function setTone(buffer: RefBuffer): void;
    function playTone(frequency: number, ms: number): void;
}
declare namespace pxsim {
    interface MusicBoard extends CommonBoard {
        audioState: AudioState;
        getDefaultPitchPin(): Pin;
    }
    function getAudioState(): AudioState;
}
declare namespace pxsim {
    interface SlideSwitchBoard extends CommonBoard {
        slideSwitchState: SlideSwitchState;
    }
}
declare namespace pxsim {
    class SlideSwitchState {
        static id: number;
        private left;
        setState(left: boolean): void;
        isLeft(): boolean;
    }
}
declare namespace pxsim.input {
    function onSwitchMoved(direction: number, body: RefAction): void;
    function switchRight(): boolean;
}
declare namespace pxsim {
    interface TemperatureBoard extends CommonBoard {
        thermometerState: AnalogSensorState;
        thermometerUnitState: TemperatureUnit;
    }
    function thermometerState(): AnalogSensorState;
    function setThermometerUnit(unit: TemperatureUnit): void;
}
declare namespace pxsim {
    enum TemperatureUnit {
        Celsius = 0,
        Fahrenheit = 1,
    }
}
declare namespace pxsim.input {
    function temperature(unit: number): number;
    function onTemperatureConditionChanged(condition: number, temperature: number, unit: number, body: RefAction): void;
}
declare namespace pxsim {
    class CapacitiveSensorState {
        capacity: number[];
        reading: boolean[];
        mapping: Map<number>;
        constructor(mapping: Map<number>);
        private getCap(pinId);
        readCap(pinId: number, samples: number): number;
        isReadingPin(pinId: number, pin: Pin): boolean;
        isReading(capId: number): boolean;
        startReading(pinId: number, pin: Pin): void;
        capacitiveSensor(capId: number, samples: number): number;
        reset(capId: number): void;
    }
    class TouchButton extends CommonButton {
        constructor(pin: number);
        setThreshold(value: number): void;
        value(): number;
    }
    class TouchButtonState {
        buttons: TouchButton[];
        constructor(pins: number[]);
    }
}
declare namespace pxsim.pxtcore {
    function getTouchButton(index: number): TouchButton;
}
declare namespace pxsim.TouchButtonMethods {
    function setThreshold(button: pxsim.TouchButton, value: number): void;
    function value(button: pxsim.TouchButton): number;
}
declare namespace pxsim.AnalogPinMethods {
    function touchButton(name: pins.AnalogPin): TouchButton;
}
declare namespace pxsim {
    interface CapTouchBoard extends CommonBoard {
        touchButtonState: TouchButtonState;
    }
}
declare namespace pxsim.network {
    function cableSendPacket(buf: RefBuffer): void;
    function cablePacket(): RefBuffer;
    function onCablePacket(body: RefAction): void;
    function onCableError(body: RefAction): void;
}
declare namespace pxsim {
    class CableState {
        packet: RefBuffer;
        packetReceived: boolean;
        PULSE_CABLE_COMPONENT_ID: number;
        PULSE_PACKET_EVENT: number;
        PULSE_PACKET_ERROR_EVENT: number;
        send(buf: RefBuffer): void;
        listen(body: RefAction): void;
        listenError(body: RefAction): void;
        receive(buf: RefBuffer): void;
    }
    interface CableBoard extends CommonBoard {
        cableState: CableState;
    }
    function getCableState(): CableState;
}
declare namespace pxsim.network {
    function infraredSendPacket(buf: RefBuffer): void;
    function infraredPacket(): RefBuffer;
    function onInfraredPacket(body: RefAction): void;
    function onInfraredError(body: RefAction): void;
}
declare namespace pxsim {
    class InfraredState {
        packet: RefBuffer;
        packetReceived: boolean;
        IR_COMPONENT_ID: number;
        IR_PACKET_EVENT: number;
        IR_PACKET_ERROR_EVENT: number;
        send(buf: RefBuffer): void;
        listen(body: RefAction): void;
        listenError(body: RefAction): void;
        receive(buf: RefBuffer): void;
    }
    interface InfraredBoard extends CommonBoard {
        irState: InfraredState;
    }
    function getInfraredState(): InfraredState;
}
