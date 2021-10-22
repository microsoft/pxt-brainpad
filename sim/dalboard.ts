/// <reference path="../node_modules/pxt-core/built/pxtsim.d.ts"/>
/// <reference path="../node_modules/pxt-core/localtypings/pxtarget.d.ts"/>
/// <reference path="../built/common-sim.d.ts"/>

namespace pxsim {
    export module PinName {
		/* GHI Changed
        export let LIGHT = -1; // adc
        export let TEMPERATURE = -1; // adc
    
        export let SCL = -1; // pwm
        export let SDA = -1; // pwm
        export let RX = -1; // pwm
        export let TX = -1; // pwm

        export let AN = -1; // analog
        export let RST = -1; // analog
        export let CS = -1; // analog
        export let PWM = -1; // pwm
        export let INT = -1; // pwm

    
        export let SCK = -1; //
        export let MISO = -1; //
        export let MOSI = -1; // 
        
        // accelerometer and screen are on the same I2C as external
        export let ACCELEROMETER_SDA = -1;
        export let ACCELEROMETER_SCL = -1;
        export let ACCELEROMETER_INT = -1;

        export let SERVO_1 = -1;
        export let SERVO_2 = -1;		
		*/
		
        export let P0 = -1;
        export let P1 = -1;
        export let P2 = -1;
        export let P3 = -1;
        export let P4 = -1;
        export let P5 = -1;
        export let P6 = -1;
        export let P7 = -1;
        export let P8 = -1;
        export let P9 = -1;
        export let P10 = -1;
        export let P11 = -1;
        export let P12 = -1;
        export let P13 = -1;
        export let P14 = -1;
        export let P15 = -1;
        export let P16 = -1;
        export let SCL = -1;
        export let SDA = -1;
		
        export function initPins() {
            let v = PinName as any;
            for (let k of Object.keys(v)) {
                let key = getConfigKey("PIN_" + k)
                if (key != null) {
                    v[k] = getConfig(key)
                }
            }
        }
    }

    const paletteSrc = [
        "#000000", // black
        "#00FFFF", // teal
    ];

    export class DalBoard extends CoreBoard implements
        AccelerometerBoard,
        AccelBoard,
        CommonBoard,
        LightBoard,
        LightSensorBoard,
        MusicBoard,
        SlideSwitchBoard,
        TemperatureBoard,
        ScreenBoard {
        // state & update logic for component services
        _neopixelState: pxt.Map<CommonNeoPixelState>;
        buttonState: CommonButtonState;
        slideSwitchState: SlideSwitchState;
        lightSensorState: AnalogSensorState;
        thermometerState: AnalogSensorState;
        thermometerUnitState: number;
        edgeConnectorState: EdgeConnectorState;
        accelerometerState: AccelerometerState;
        audioState: AudioState;
        //lightBulbState: LightBulbState;
        accelState: AccelState;
        screenState: ScreenState;
		ledState: LedState;
		// matrixLedState: LedState[];

        invertAccelerometerYAxis = true;

        view: SVGSVGElement;

        constructor() {
            super()

            PinName.initPins()

            this._neopixelState = {};
            this.bus.setNotify(DAL.DEVICE_ID_NOTIFY, DAL.DEVICE_ID_NOTIFY_ONE);

            // IDs do matter!
            this.buttonState = new CommonButtonState([
                new CommonButton(45), // A
                new CommonButton(23), // B
            ]);
            //this.builtinParts["lightbulb"] = this.lightBulbState = new LightBulbState();
            this.builtinParts["accelerometer"] = this.accelState = new AccelState();
            this.builtinParts["switch"] = this.slideSwitchState = new SlideSwitchState();
            this.builtinParts["audio"] = this.audioState = new AudioState();
            this.builtinParts["lightsensor"] = this.lightSensorState = new AnalogSensorState(DAL.DEVICE_ID_LIGHT_SENSOR, 0, 255);
            this.builtinParts["thermometer"] = this.thermometerState = new AnalogSensorState(DAL.DEVICE_ID_THERMOMETER, -5, 50);
            this.builtinParts["screen"] = this.screenState = new ScreenState(paletteSrc, 128, 64);

            this.builtinParts["accelerometer"] = this.accelerometerState = new AccelerometerState(runtime);
            this.builtinParts["edgeconnector"] = this.edgeConnectorState = new EdgeConnectorState({
                pins: [
				/* GHI changed
                    pxsim.PinName.SERVO_1,
                    pxsim.PinName.SERVO_2,
                    pxsim.PinName.SCL,
                    pxsim.PinName.SDA,
                    pxsim.PinName.RX,
                    pxsim.PinName.TX,
                    pxsim.PinName.AN,
                    pxsim.PinName.RST,
                    pxsim.PinName.CS,
                    pxsim.PinName.PWM,
                    pxsim.PinName.INT,                    
				*/	
					pxsim.PinName.P0,
					pxsim.PinName.P1,
					pxsim.PinName.P2,
					pxsim.PinName.P3,
					pxsim.PinName.P4,
					pxsim.PinName.P5,
					pxsim.PinName.P6,
					pxsim.PinName.P7,
					pxsim.PinName.P8,
					pxsim.PinName.P9,
					pxsim.PinName.P10,
					pxsim.PinName.P11,
					pxsim.PinName.P12,
					pxsim.PinName.P13,
					pxsim.PinName.P14,
					pxsim.PinName.P15,
					pxsim.PinName.P16,
					pxsim.PinName.SCL,
					pxsim.PinName.SDA,

                ]
            });
            this.builtinParts["microservo"] = this.edgeConnectorState;
            this.builtinVisuals["microservo"] = () => new visuals.MicroServoView();
            this.builtinPartVisuals["microservo"] = (xy: visuals.Coord) => visuals.mkMicroServoPart(xy);
			this.builtinParts["led"] = this.ledState = new LedState(runtime);
			
			// this.matrixLedState = new Array(25)
			
			// for (let i = 0; i < 25; i++) {
				// this.matrixLedState[i] = new LedState(runtime);
			// }
			
			// this.builtinParts["matrixLedState"] = this.matrixLedState;
        }

        receiveMessage(msg: SimulatorMessage) {
            if (!runtime || runtime.dead) return;

            switch (msg.type || "") {
                case "eventbus": {
                    let ev = <SimulatorEventBusMessage>msg;
                    this.bus.queue(ev.id, ev.eventid, ev.value);
                    break;
                }
                case "serial": {
                    let data = (<SimulatorSerialMessage>msg).data || "";
                    // TODO
                    break;
                }
            }
        }

        initAsync(msg: SimulatorRunMessage): Promise<void> {
            super.initAsync(msg);

            const options = (msg.options || {}) as pxt.RuntimeOptions;

            const boardDef = msg.boardDefinition;
            const cmpsList = msg.parts;
            const cmpDefs = msg.partDefinitions || {};
            const fnArgs = msg.fnArgs;

            const opts: visuals.BoardHostOpts = {
                state: this,
                boardDef: boardDef,
                partsList: cmpsList,
                partDefs: cmpDefs,
                fnArgs: fnArgs,
                maxWidth: "100%",
                maxHeight: "100%",
            };
            const viewHost = new visuals.BoardHost(pxsim.visuals.mkBoardView({
                visual: boardDef.visual
            }), opts);

            document.body.innerHTML = ""; // clear children
            document.body.appendChild(this.view = viewHost.getView() as SVGSVGElement);

            this.accelerometerState.attachEvents(this.view);

            return Promise.resolve();
        }

        screenshot(): string {
            return svg.toDataUri(new XMLSerializer().serializeToString(this.view));
        }

        tryGetNeopixelState(pinId: number): CommonNeoPixelState {
            return this._neopixelState[pinId];
        }

        neopixelState(pinId: number): CommonNeoPixelState {
            let state = this._neopixelState[pinId];
            if (!state) state = this._neopixelState[pinId] = new CommonNeoPixelState();
            return state;
        }

        defaultNeopixelPin(): Pin {
            return undefined;
        }

        getDefaultPitchPin(): Pin {
            return undefined;
        }
    }

    export function initRuntimeWithDalBoard() {
        U.assert(!runtime.board);
        let b = new DalBoard();
        runtime.board = b;
        runtime.postError = (e) => {
            // TODO
            runtime.updateDisplay();
        }
    }

    if (!pxsim.initCurrentRuntime) {
        pxsim.initCurrentRuntime = initRuntimeWithDalBoard;
    }
}
