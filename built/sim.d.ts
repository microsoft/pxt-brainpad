/// <reference path="../node_modules/pxt-core/built/pxtsim.d.ts" />
/// <reference path="../node_modules/pxt-core/localtypings/pxtarget.d.ts" />
/// <reference path="common-sim.d.ts" />
/// <reference path="../node_modules/pxt-core/typings/globals/bluebird/index.d.ts" />
/// <reference path="../node_modules/pxt-core/built/pxtrunner.d.ts" />
declare namespace pxsim {
    module CPlayPinName {
        let A0: number;
        let A1: number;
        let A2: number;
        let A3: number;
        let A4: number;
        let A5: number;
        let A6: number;
        let A7: number;
        let A8: number;
        let A9: number;
        let D4: number;
        let D5: number;
        let D6: number;
        let D7: number;
        let D8: number;
        let D13: number;
        function init(): void;
    }
    class DalBoard extends CoreBoard implements AccelerometerBoard, CommonBoard, LightBoard, LightSensorBoard, MicrophoneBoard, MusicBoard, SlideSwitchBoard, TemperatureBoard, InfraredBoard, CapTouchBoard {
        _neopixelState: pxt.Map<CommonNeoPixelState>;
        buttonState: CommonButtonState;
        slideSwitchState: SlideSwitchState;
        lightSensorState: AnalogSensorState;
        thermometerState: AnalogSensorState;
        thermometerUnitState: number;
        microphoneState: AnalogSensorState;
        edgeConnectorState: EdgeConnectorState;
        capacitiveSensorState: CapacitiveSensorState;
        accelerometerState: AccelerometerState;
        audioState: AudioState;
        touchButtonState: TouchButtonState;
        irState: InfraredState;
        lightBulbState: LightBulbState;
        invertAccelerometerYAxis: boolean;
        view: SVGSVGElement;
        constructor();
        receiveMessage(msg: SimulatorMessage): void;
        initAsync(msg: SimulatorRunMessage): Promise<void>;
        screenshot(): string;
        tryGetNeopixelState(pinId: number): CommonNeoPixelState;
        neopixelState(pinId: number): CommonNeoPixelState;
        defaultNeopixelPin(): Pin;
        getDefaultPitchPin(): Pin;
    }
    function initRuntimeWithDalBoard(): void;
}
import pxtrunner = pxt.runner;
import pxtdocs = pxt.docs;
declare namespace pxsim.instructions {
    function drawInstructions(): void;
}
declare namespace pxsim {
    class LightBulbState {
        private r;
        private g;
        private b;
        setColor(r: number, g: number, b: number): void;
        getColor(): [number, number, number];
    }
}
declare namespace pxsim.lightbulb {
    function setRGBLed(r: number, g: number, b: number): void;
}
declare namespace pxsim.visuals {
    interface IBoardTheme {
        accent?: string;
        display?: string;
        pin?: string;
        pinTouched?: string;
        pinActive?: string;
        ledOn?: string;
        ledOff?: string;
        buttonOuter?: string;
        buttonUps: string[];
        buttonDown?: string;
        virtualButtonOuter?: string;
        virtualButtonUp?: string;
        virtualButtonDown?: string;
        lightLevelOn?: string;
        lightLevelOff?: string;
        soundLevelOn?: string;
        soundLevelOff?: string;
        gestureButtonOn?: string;
        gestureButtonOff?: string;
    }
    var themes: IBoardTheme[];
    function randomTheme(): IBoardTheme;
    interface IBoardProps {
        runtime?: pxsim.Runtime;
        theme?: IBoardTheme;
        disableTilt?: boolean;
        wireframe?: boolean;
    }
    class BrainPadBoardSvg implements BoardView {
        props: IBoardProps;
        element: SVGSVGElement;
        private style;
        private defs;
        private g;
        private buttons;
        private buttonsOuter;
        private buttonABText;
        private pins;
        private pinControls;
        private rgbLed;
        private systemLed;
        private irReceiver;
        private irTransmitter;
        private redLED;
        private slideSwitch;
        private lightLevelButton;
        private lightLevelGradient;
        private lightLevelText;
        private soundLevelButton;
        private soundLevelGradient;
        private soundLevelText;
        private thermometerGradient;
        private thermometer;
        private thermometerText;
        private antenna;
        private shakeButtonGroup;
        private shakeText;
        board: pxsim.DalBoard;
        private pinNmToCoord;
        constructor(props: IBoardProps);
        private fixPinIds();
        getView(): SVGAndSize<SVGSVGElement>;
        getCoord(pinNm: string): Coord;
        highlightPin(pinNm: string): void;
        getPinDist(): number;
        private recordPinCoords();
        private updateTheme();
        updateState(): void;
        private lastFlashTime;
        private flashSystemLed();
        private lastIrReceiverFlash;
        flashIrReceiver(): void;
        private lastIrTransmitterFlash;
        flashIrTransmitter(): void;
        private updateInfrared();
        private updateRedLED();
        private updateRgbLed();
        private updateNeoPixels();
        private updateSwitch();
        private slideSwitchHandler();
        private renderSwitchAria();
        private updateSound();
        private updatePins();
        private updatePin(pin, index);
        private updateLightLevel();
        private applyLightLevel();
        private updateSoundLevel();
        private applySoundLevel();
        private updateTemperature();
        private updateButtonAB();
        private updateGestures();
        private updateTilt();
        private buildDom();
        private mkBtn(left, top, label);
        private attachEvents();
    }
}
declare namespace pxsim.visuals {
    const BOARD_SVG: string;
}
declare namespace pxsim.visuals {
}
declare namespace pxsim.visuals {
    class AnalogPinControl {
        private parent;
        private defs;
        private id;
        private outerElement;
        private innerCircle;
        private gradient;
        private currentValue;
        private pin;
        constructor(parent: BrainPadBoardSvg, defs: SVGDefsElement, id: number, name: string);
        updateTheme(): void;
        updateValue(): void;
        private addButtonEvents();
        private addLevelControlEvents();
    }
}
