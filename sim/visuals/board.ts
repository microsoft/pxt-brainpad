namespace pxsim.visuals {
    const MB_STYLE = `
        svg.sim {
            box-sizing: border-box;
            width: 100%;
            height: 100%;
            display: block;
        }
        svg.sim.grayscale {
            -moz-filter: grayscale(1);
            -webkit-filter: grayscale(1);
            filter: grayscale(1);
        }
        .sim-button {
            pointer-events: none;
        }

        .sim-button-outer {
            cursor: pointer;
        }
        .sim-button-outer:hover {
            stroke-width: 1px;
            stroke: orange !important;
        }
        .sim-button-nut {
            fill:#704A4A;
            pointer-events:none;
        }
        .sim-button-nut:hover {
            stroke:1px solid #704A4A;
        }
        .sim-pin-touch:hover {
            stroke:#D4AF37;
            stroke-width:1px;
        }

        .sim-pin-touch.touched:hover {
            stroke:darkorange;
        }

        .sim-led-back:hover {
            stroke:#fff;
            stroke-width:3px;
        }
        .sim-led:hover {
            stroke:#ff7f7f;
            stroke-width:3px;
        }

        .sim-systemled {
            fill:#333;
            stroke:#555;
            stroke-width: 1px;
        }
          
         .sim-drawcircle {
           
            stroke:#42c5f4;
            stroke-width: 6px;
           
        }

        .sim-light-level-button {
            stroke:#f1c40f;
            stroke-width: 1px;
        }

        .sim-pin-level-button {
            stroke:darkorange;
            stroke-width: 1px;
        }

        .sim-sound-level-button {
            stroke:#7f8c8d;
            stroke-width: 1px;
        }

        .sim-antenna {
            stroke:#555;
            stroke-width: 2px;
        }

        .sim-text {
            font-family:"Lucida Console", Monaco, monospace;
            font-size: 40px;
            fill: #000;
        }
        .sim-text, svg.sim text {
            pointer-events: none; user-select: none;
        }
        .sim-text.small {
            font-size:6px;
        }
        .sim-text.inverted {
            fill:#000;
        }

        .sim-text-pin {
            font-family:"Lucida Console", Monaco, monospace;
            font-size:5px;
            fill:#fff;
            pointer-events: none;
        }

        .sim-thermometer {
        }

        #rgbledcircle:hover {
            r:8px;
        }

        #SLIDE_HOVER {
            cursor: pointer;
        }
        .sim-slide-switch:hover #SLIDE_HOVER {
            stroke:orange !important;
            stroke-width: 1px;
        }

        .sim-slide-switch-inner.on {
            fill:#ff0000 !important;
        }

        /* animations */
        .sim-theme-glow {
            animation-name: sim-theme-glow-animation;
            animation-timing-function: ease-in-out;
            animation-direction: alternate;
            animation-iteration-count: infinite;
            animation-duration: 1.25s;
        }
        @keyframes sim-theme-glow-animation {
            from { opacity: 1; }
            to   { opacity: 0.75; }
        }

        .sim-flash {
            animation-name: sim-flash-animation;
            animation-duration: 0.1s;
        }

        @keyframes sim-flash-animation {
            from { fill: yellow; }
            to   { fill: default; }
        }

        .sim-flash-stroke {
            animation-name: sim-flash-stroke-animation;
            animation-duration: 0.4s;
            animation-timing-function: ease-in;
        }

        @keyframes sim-flash-stroke-animation {
            from { stroke: yellow; }
            to   { stroke: default; }
        }


        .sim-sound-stroke {
            stroke-width: 10px;
            animation-name: sim-sound-stroke-animation;
            animation-duration: 0.4s;
        }

        @keyframes sim-sound-stroke-animation {
            from { stroke: yellow; }
            to   { stroke: default; }
        }

        /* wireframe */
        .sim-wireframe * {
            fill: none;
            stroke: black;
        }
        .sim-wireframe .sim-display,
        .sim-wireframe .sim-led,
        .sim-wireframe .sim-led-back,
        .sim-wireframe .sim-head,
        .sim-wireframe .sim-theme,
        .sim-wireframe .sim-button-group,
        .sim-wireframe .sim-button-label,
        .sim-wireframe .sim-button,
        .sim-wireframe .sim-text-pin
        {
            visibility: hidden;
        }
        .sim-wireframe .sim-label
        {
            stroke: none;
            fill: #777;
        }
        .sim-wireframe .sim-board {
            stroke-width: 2px;
        }
        *:focus {
            outline: none;
        }
        .sim-button-outer:focus,
        .sim-slide-switch:focus,
        .sim-pin:focus,
        .sim-thermometer:focus,
        .sim-button-group:focus .sim-button-outer,
        .sim-light-level-button:focus,
        .sim-sound-level-button:focus {
            stroke: #4D90FE;
            stroke-width: 2px !important;
         }
        .no-drag {
            user-drag: none;
            user-select: none;
            -moz-user-select: none;
            -webkit-user-drag: none;
            -webkit-user-select: none;
            -ms-user-select: none;
        }
    `;

    const pinNames: { 'name': string, 'touch': number, 'text': any, 'id'?: number, tooltip?: string }[] = [
    ];
    const MB_WIDTH = 1795.6;
    const MB_HEIGHT = 1027.79999;
    export interface IBoardTheme {
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

    export var themes: IBoardTheme[] = ["#3ADCFE"].map(accent => {
        return {
            accent: accent,
            pin: "#D4AF37",
            pinTouched: "#FFA500",
            pinActive: "#FF5500",
            ledOn: "#ff7777",
            ledOff: "transparent",
            buttonOuter: "#979797",
            buttonUps: ["#000", "#000", "#000", "#000"],
            buttonDown: "#FFA500",
            virtualButtonDown: "#FFA500",
            virtualButtonOuter: "#333",
            virtualButtonUp: "#FFF",
            lightLevelOn: "yellow",
            lightLevelOff: "#555",
            soundLevelOn: "#7f8c8d",
            soundLevelOff: "#555",
            gestureButtonOn: "#FFA500",
            gestureButtonOff: "#B4009E"
        }
    });

    export function randomTheme(): IBoardTheme {
        return themes[Math.floor(Math.random() * themes.length)];
    }

    export interface IBoardProps {
        runtime?: pxsim.Runtime;
        theme?: IBoardTheme;
        disableTilt?: boolean;
        wireframe?: boolean;
    }

    export class BrainPadBoardSvg implements BoardView {
        public element: SVGSVGElement;
        private style: SVGStyleElement;
        private defs: SVGDefsElement;
        private g: SVGGElement;

        private buttons: SVGElement[];
        private buttonsOuter: SVGElement[];
        private pins: SVGElement[];
        private pinControls: { [index: number]: AnalogPinControl };
        private rgbLed: SVGCircleElement;
        private systemLed: SVGElement;
        private redLED: SVGRectElement;
        private lcd: SVGImageElement;
        private lcdLed1: SVGImageElement;
        private lcdRectLed1: SVGRectElement;
        private lightLevelButton: SVGCircleElement;
        private lightLevelGradient: SVGLinearGradientElement;
        private lightLevelText: SVGTextElement;
        private soundLevelButton: SVGCircleElement;
        private soundLevelGradient: SVGLinearGradientElement;
        private soundLevelText: SVGTextElement;
        private thermometerGradient: SVGLinearGradientElement;
        private thermometer: SVGRectElement;
        private thermometerText: SVGTextElement;
        private shakeButtonGroup: SVGElement;
        private shakeText: SVGTextElement;
        private screenCanvas: HTMLCanvasElement;

        public board: pxsim.DalBoard;
        private pinNmToCoord: Map<Coord> = {
        };

        private led: SVGCircleElement;
        private counter: number = 0;
		private ledMatrixActive = false;

        constructor(public props: IBoardProps) {


            this.fixPinIds();
            this.buildDom();

            if (props && props.wireframe)
                pxsim.U.addClass(this.element, "sim-wireframe");

            if (props && props.theme)
                this.updateTheme();

            if (props && props.runtime) {
                this.board = this.props.runtime.board as pxsim.DalBoard;
                this.board.updateSubscribers.push(() => this.updateState());
                this.updateState();
                this.attachEvents();
                this.initScreen();
            }
            //getResume();
        }

        private fixPinIds() {
            /* GHI changed
            for (let pn of pinNames) {
                let key = getConfigKey(pn.name);
                if (key != null)
                    pn.id = getConfig(key);
            }
            */
        }

        private flush() {

        }

        private initScreen() {

            let requested = false;
            this.screenCanvas.width = this.board.screenState.width
            this.screenCanvas.height = this.board.screenState.height

            const ctx = this.screenCanvas.getContext("2d")
            ctx.imageSmoothingEnabled = false
            const imgdata = ctx.getImageData(0, 0, this.board.screenState.width, this.board.screenState.height)

            const arr = new Uint32Array(imgdata.data.buffer)

            // this.board.screenState.onChange = () => {

            // arr.set(this.board.screenState.screen)

            // runtime.queueDisplayUpdate();
            // ctx.putImageData(imgdata, 0, 0)

            // this.lcd.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", this.screenCanvas.toDataURL());

            // window.requestAnimationFrame(this.flush)

            // }




            this.board.screenState.onChange = () => {

                const flush = () => {
                    requested = false
                    if (this.ledMatrixActive == false) {
						for (let i = 0; i < this.board.screenState.screen.length; i++) {
							if (this.board.screenState.screen[i] == 0xFF000000 || this.board.screenState.screen[i] == 0)
								this.board.screenState.screen[i] = 0xFF000000;
							else 
								this.board.screenState.screen[i] = 0xFFFFFFFF;
						}
												
						const imgdataFlush = ctx.getImageData(0, 0, this.board.screenState.width, this.board.screenState.height)


						const arrFlush = new Uint32Array(imgdataFlush.data.buffer)
						
						arrFlush.set(this.board.screenState.screen)
						
						ctx.putImageData(imgdataFlush, 0, 0)
					}
                    this.lcd.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", this.screenCanvas.toDataURL());

                }

                // after we did one-time setup, redefine ourselves to be quicker
                this.board.screenState.onChange = () => {
                    arr.set(this.board.screenState.screen)
                    // paint rect
                    runtime.queueDisplayUpdate();
                    if (!requested) {
                        requested = true
                        // ctx.putImageData(imgdata, 0, 0)
                        // this.lcd.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", this.screenCanvas.toDataURL());
                        window.requestAnimationFrame(flush)
                    }
                }
                // and finally call the redefined self
                this.board.screenState.onChange()
            }




        }

        public getView(): SVGAndSize<SVGSVGElement> {

            return {
                el: this.element,
                y: 0,
                x: 0,
                w: MB_WIDTH,
                h: MB_HEIGHT
            };
        }

        public getCoord(pinNm: string): Coord {
            /* GHI changed
            return this.pinNmToCoord[pinNm];
            */

            return null;
        }

        public highlightPin(pinNm: string): void {
            //TODO: for instructions
        }

        public getPinDist(): number {
            return 10;
        }

        private recordPinCoords() {
            /* GHI changed
            pinNames.forEach((pin, i) => {
                const nm = pin.name;
                const p = this.pins[i];
                const r = p.getBoundingClientRect();
                this.pinNmToCoord[nm] = [r.left + r.width / 2, r.top + r.height / 2];
            });
            console.log(JSON.stringify(this.pinNmToCoord, null, 2))
            */
        }

        private updateTheme() {
            let theme = this.props.theme;

            // GHI changed svg.fills(this.buttonsOuter, theme.buttonOuter);
            svg.fill(this.buttons[0], theme.buttonUps[0]);
            svg.fill(this.buttons[1], theme.buttonUps[1]);


            // if (this.shakeButtonGroup) {
            //     svg.fill(this.shakeButtonGroup, this.props.theme.gestureButtonOff);
            // }

            svg.setGradientColors(this.lightLevelGradient, theme.lightLevelOn, theme.lightLevelOff);

            svg.setGradientColors(this.thermometerGradient, theme.ledOff, theme.ledOn);
            // svg.setGradientColors(this.soundLevelGradient, theme.soundLevelOn, theme.soundLevelOff);

            // for (const id in this.pinControls) {
            //     this.pinControls[id].updateTheme();
            // }

        }

        public updateState() {

            let state = this.board;
            if (!state) return;

            let theme = this.props.theme;

            let bpState = state.buttonState;
            let buttons = bpState.buttons;
            svg.fill(this.buttons[0], buttons[0].pressed ? theme.buttonDown : theme.buttonUps[0]);
            svg.fill(this.buttons[1], buttons[1].pressed ? theme.buttonDown : theme.buttonUps[1]);

            /* GHI changed	
            this.updateRgbLed();
        	
            this.updateGestures();

            this.updateSound();
            this.updateLightLevel();
            this.updateTemperature();

            if (!runtime || runtime.dead) svg.addClass(this.element, "grayscale");
            else svg.removeClass(this.element, "grayscale");
            */
            this.updateSound();
            this.updateLed();
            this.UpdateScreen();
			this.updateGestures();

        }

        private lastFlashTime: number = 0;
        private flashSystemLed() {
            /* GHI changed
            if (!this.systemLed)
                this.systemLed = this.element.getElementById("LED_PWR-2") as SVGElement;
            let now = Date.now();
            if (now - this.lastFlashTime > 150) {
                this.lastFlashTime = now;
                svg.animate(this.systemLed, "sim-flash")
            }
            */
        }

        private updateLed() {
            let state = this.board;
            if (!state) return;

            const on = state.ledState.getState();

            if (this.led) {
                if (on) {
                    svg.fill(this.led, `#f08000`);
                    this.led.style.strokeWidth = "0.28349999";
                    this.led.style.stroke = "#f08000";
                }
                else {
                    svg.fill(this.led, `#ffffff`);
                    this.led.style.strokeWidth = "0.28349999";
                    this.led.style.stroke = "#0000ff";
                }
            }
        }

        private UpdateScreen() {
            let state = this.board;
            if (!state) return;

            const ledMatrix = state.matrixLedState;			

            if (ledMatrix) { 

				if (!pxsim.display.getMatrixLedUpdateState()) {
					return;
				}

				pxsim.display.setMatrixLedUpdateState(false);

				//const on = ledMatrix[0].getState();

				//update led matrix screen
				this.screenCanvas.width = this.board.screenState.width
				this.screenCanvas.height = this.board.screenState.height

				const ctx = this.screenCanvas.getContext("2d")
				ctx.imageSmoothingEnabled = false
				const imgdata = ctx.getImageData(0, 0, this.board.screenState.width, this.board.screenState.height)


				const arr = new Uint32Array(imgdata.data.buffer)

				// let ledWidth = (this.board.screenState.width / 5) | 0;
				// let ledHeight = (this.board.screenState.height / 5) | 0;
				
				let ledWidth = (this.board.screenState.height / 5) | 0;
				let ledHeight = (this.board.screenState.height / 5) | 0;


				for (let i = 0; i < this.board.screenState.screen.length; i++) {
					this.board.screenState.screen[i] = 0xFF000000;
				}
				
				let active = false; // TQD_TODO: 
				
				for (let led = 0; led < ledMatrix.length; led++) {
					let xSrc = (led % 5) | 0;
					let ySrc = (led / 5) | 0;

					let xDest = xSrc * ledWidth + 34;
					let yDest = ySrc * ledHeight;

					
					
					for (let y = yDest+1; y < yDest + ledHeight-2; y++) {
						for (let x = xDest+1; x < xDest + ledWidth-2; x++) {
							let arrId = (y * this.board.screenState.width + x) | 0;

							if (ledMatrix[led].getState() == true) {
								this.board.screenState.screen[arrId] = 0xFFFFFFFF;
								
								active = true;
							}							

						}
					}					
				}
				
				this.ledMatrixActive = active;

				arr.set(this.board.screenState.screen)

				runtime.queueDisplayUpdate();
				ctx.putImageData(imgdata, 0, 0)

				this.lcd.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", this.screenCanvas.toDataURL());				

				window.requestAnimationFrame(this.flush)
            }



        }

        private updateRgbLed() {
            /* GHI changed
            let state = this.board;
            if (!state) return;
           
            const rgb = state.lightBulbState.getColor();

            if (!this.led) {
                if (this.rgbLed) {
                    if (!rgb || (rgb.length >= 3 && rgb[0] === 0 && rgb[1] === 0 && rgb[2] === 0)) {
                        // Clear the pixel
                        svg.fill(this.rgbLed, `#feffe9`);
                        svg.filter(this.rgbLed, null);
                        this.rgbLed.style.strokeWidth = "0.28349999";
                        this.rgbLed.style.stroke = "#58595b";
                    } else {
                        let hsl = visuals.rgbToHsl(rgb);
                        let [h, s, l] = hsl;
                        let lx = Math.max(l * 1.3, 85);
                        // at least 10% luminosity
                        l = l * 90 / 100 + 10;
                        this.rgbLed.style.stroke = `hsl(${h}, ${s}%, ${Math.min(l * 3, 75)}%)`
                        this.rgbLed.style.strokeWidth = "1.5";
                        svg.fill(this.rgbLed, `hsl(${h}, ${s}%, ${lx}%)`)
                        svg.filter(this.rgbLed, `url(#neopixelglow)`);
                    	
                        // let transform = l / 100 * 0.5;
                        // this.rgbLed.style.transform = `scale(${0.9 + transform})`;
                        // this.rgbLed.style.transformOrigin = "211.30725px 43.049255px";
                    }
                }
            }
            */
        }

        private updateSound() {
            /* GHI changed
            let state = this.board;
            if (!state || !state.audioState) return;
            let audioState = state.audioState;

            let soundBoard = this.element.getElementById('BUZZER-1002') as SVGGElement;
            if (audioState.isPlaying()) {
                svg.addClass(soundBoard, "sim-sound-stroke");
            } else {
                svg.removeClass(soundBoard, "sim-sound-stroke");
            }
            */
        }

        private updatePins() {
            /* GHI changed
            let state = this.board;
            if (!state || !state.edgeConnectorState) return;
            state.edgeConnectorState.pins.forEach((pin, i) => this.updatePin(pin, i));
            */
        }

        private updatePin(pin: Pin, index: number) {
            /*
            if (!pin || !this.pins[index]) return;

            if ((pin as pins.CommonPin).used) {
                if (this.pinControls[pin.id] === undefined) {
                    const pinName = pinNames.filter((a) => a.id === pin.id)[0];
                    if (pinName) {
                        this.pinControls[pin.id] = new AnalogPinControl(this, this.defs, pin.id, pinName.name);
                    }
                    else {
                        // TODO: Surface pin controls for sensor pins in some way?
                        this.pinControls[pin.id] = null;
                    }
                }

                if (this.pinControls[pin.id]) {
                    this.pinControls[pin.id].updateValue();
                }
            }
            */
        }

        private updateLightLevel() {
            /*
            let state = this.board;
            if (!state || !state.lightSensorState.sensorUsed) return;

            if (!this.lightLevelButton) {
                let gid = "gradient-light-level";
                this.lightLevelGradient = svg.linearGradient(this.defs, gid)
                let cy = 590;
                let r = 50;
                this.lightLevelButton = svg.child(this.g, "circle", {
                    cx: `100px`, cy: `${cy}px`, r: `${r}px`,
                    class: 'sim-light-level-button no-drag',
                    fill: `url(#${gid})`
                }) as SVGCircleElement;
                let pt = this.element.createSVGPoint();
                svg.buttonEvents(this.lightLevelButton,
                    // move
                    (ev) => {
                        let pos = svg.cursorPoint(pt, this.element, ev);
                        let rs = r / 2;
                        let level = Math.max(0, Math.min(255, Math.floor((pos.y - (cy - rs)) / (2 * rs) * 255)));
                        if (level != this.board.lightSensorState.getLevel()) {
                            this.board.lightSensorState.setLevel(level);
                            this.applyLightLevel();
                        }
                    },
                    // start
                    ev => { },
                    // stop
                    ev => { },
                    // keydown
                    (ev) => {
                        let charCode = (typeof ev.which == "number") ? ev.which : ev.keyCode
                        if (charCode === 40 || charCode === 37) { // Down/Left arrow
                            if (this.board.lightSensorState.getLevel() === 0) {
                                this.board.lightSensorState.setLevel(255);
                            } else {
                                this.board.lightSensorState.setLevel(this.board.lightSensorState.getLevel() - 1);
                            }
                            this.applyLightLevel();
                        } else if (charCode === 38 || charCode === 39) { // Up/Right arrow
                            if (this.board.lightSensorState.getLevel() === 255) {
                                this.board.lightSensorState.setLevel(0);
                            } else {
                                this.board.lightSensorState.setLevel(this.board.lightSensorState.getLevel() + 1);
                            }
                            this.applyLightLevel();
                        }
                    });
                this.lightLevelText = svg.child(this.g, "text", { x: 70, y: cy + r - 130, text: '', class: 'sim-text' }) as SVGTextElement;
                this.updateTheme();

                accessibility.makeFocusable(this.lightLevelButton);
                accessibility.setAria(this.lightLevelButton, "slider", "Light level");
                this.lightLevelButton.setAttribute("aria-valuemin", "0");
                this.lightLevelButton.setAttribute("aria-valuemax", "255");
                this.lightLevelButton.setAttribute("aria-orientation", "vertical");
                this.lightLevelButton.setAttribute("aria-valuenow", "128");
            }

            svg.setGradientValue(this.lightLevelGradient, Math.min(100, Math.max(0, Math.floor(state.lightSensorState.getLevel() * 100 / 255))) + '%')
            this.lightLevelText.textContent = state.lightSensorState.getLevel().toString();
            */
        }

        private applyLightLevel() {
            /*
            let lv = this.board.lightSensorState.getLevel();
            svg.setGradientValue(this.lightLevelGradient, Math.min(100, Math.max(0, Math.floor(lv * 100 / 255))) + '%')
            this.lightLevelText.textContent = lv.toString();
            this.lightLevelButton.setAttribute("aria-valuenow", lv.toString());
            accessibility.setLiveContent(lv.toString());
            */
        }

        private updateTemperature() {
            /* GHI changed
            let state = this.board;
            if (!state || !state.thermometerState || !state.thermometerState.sensorUsed) return;

            // Celsius
            let tmin = -5;
            let tmax = 50;
            if (!this.thermometer) {
                let gid = "gradient-thermometer";
                this.thermometerGradient = svg.linearGradient(this.defs, gid);
                this.thermometer = <SVGRectElement>svg.child(this.g, "rect", {
                    class: "sim-thermometer no-drag",
                    x: 72,
                    y: 120,
                    width: 39,
                    height: 260,
                    rx: 2, ry: 2,
                    fill: `url(#${gid})`
                });
                this.thermometerText = svg.child(this.g, "text", { class: 'sim-text', x: 70, y: 100 }) as SVGTextElement;
                this.updateTheme();

                let pt = this.element.createSVGPoint();
                svg.buttonEvents(this.thermometer,
                    // move
                    (ev) => {
                        let cur = svg.cursorPoint(pt, this.element, ev);
                        let t = Math.max(0, Math.min(1, (380 - cur.y) / 160))
                        state.thermometerState.setLevel(Math.floor(tmin + t * (tmax - tmin)));
                        this.updateTemperature();
                    },
                    // start
                    ev => { },
                    // stop
                    ev => { },
                    // keydown
                    (ev) => {
                        let charCode = (typeof ev.which == "number") ? ev.which : ev.keyCode
                        if (charCode === 40 || charCode === 37) { // Down/Left arrow
                            if (state.thermometerState.getLevel() === -5) {
                                state.thermometerState.setLevel(50);
                            } else {
                                state.thermometerState.setLevel(state.thermometerState.getLevel() - 1);
                            }
                            this.updateTemperature();
                        } else if (charCode === 38 || charCode === 39) { // Up/Right arrow
                            if (state.thermometerState.getLevel() === 50) {
                                state.thermometerState.setLevel(-5);
                            } else {
                                state.thermometerState.setLevel(state.thermometerState.getLevel() + 1);
                            }
                            this.updateTemperature();
                        }
                    });

                accessibility.makeFocusable(this.thermometer);
                accessibility.setAria(this.thermometer, "slider", "Thermometer");
                this.thermometer.setAttribute("aria-valuemin", tmin.toString());
                this.thermometer.setAttribute("aria-valuemax", tmax.toString());
                this.thermometer.setAttribute("aria-orientation", "vertical");
            }

            let t = Math.max(tmin, Math.min(tmax, state.thermometerState.getLevel()))
            let per = Math.floor((state.thermometerState.getLevel() - tmin) / (tmax - tmin) * 100)
            svg.setGradientValue(this.thermometerGradient, 100 - per + "%");

            let unit = "°C";
            if (state.thermometerUnitState == pxsim.TemperatureUnit.Fahrenheit) {
                unit = "°F";
                t = ((t * 18) / 10 + 32) >> 0;
            }
            this.thermometerText.textContent = t + unit;
            this.thermometer.setAttribute("aria-valuenow", t.toString());
            this.thermometer.setAttribute("aria-valuetext", t + unit);
            accessibility.setLiveContent(t + unit);
            */
        }

        private updateGestures() {
            /* GHI changed
            let state = this.board;
            if (state.accelerometerState.useShake && !this.shakeButtonGroup) {
                const btnr = 2;
                const width = 22;
                const height = 10;

                let btng = svg.child(this.g, "g", { class: "sim-button-group" });
                this.shakeButtonGroup = btng;
                this.shakeText = svg.child(this.g, "text", { x: 81, y: 32, class: "sim-text small" }) as SVGTextElement;
                this.shakeText.textContent = "SHAKE"

                svg.child(btng, "rect", { class: "sim-button-outer", x: 79, y: 25, rx: btnr, ry: btnr, width, height });
                svg.fill(btng, this.props.theme.gestureButtonOff);
                pointerEvents.down.forEach(evid => this.shakeButtonGroup.addEventListener(evid, ev => {
                    let state = this.board;
                    svg.fill(btng, this.props.theme.gestureButtonOn);
                    svg.addClass(this.shakeText, "inverted");
                }))
                this.shakeButtonGroup.addEventListener(pointerEvents.leave, ev => {
                    let state = this.board;
                    svg.fill(btng, this.props.theme.gestureButtonOff);
                    svg.removeClass(this.shakeText, "inverted");
                })
                this.shakeButtonGroup.addEventListener(pointerEvents.up, ev => {
                    let state = this.board;
                    svg.fill(btng, this.props.theme.gestureButtonOff);
                    this.board.bus.queue(DAL.DEVICE_ID_GESTURE, 11); // GESTURE_SHAKE
                    svg.removeClass(this.shakeText, "inverted");
                })
                accessibility.makeFocusable(this.shakeButtonGroup);
                accessibility.enableKeyboardInteraction(this.shakeButtonGroup, () => {
                    this.board.bus.queue(DAL.DEVICE_ID_GESTURE, 11);
                });
                accessibility.setAria(this.shakeButtonGroup, "button", "Shake the board");
            }
            */
			
			let state = this.board;
			
			// Disable accelerometer now
			if (state.accelerometerState.accelerometer.isActive)
				state.accelerometerState.accelerometer.isActive = false;
        }

        private buildDom() {

            this.element = new DOMParser().parseFromString(BOARD_SVG, "image/svg+xml").querySelector("svg") as SVGSVGElement;
            /* GHI changed	
            svg.hydrate(this.element, {
                "version": "1.0",
                "viewBox": `0 0 ${MB_WIDTH} ${MB_HEIGHT}`,
                "class": "sim",
                "x": "0px",
                "y": "0px",
                "width": MB_WIDTH + "px",
                "height": MB_HEIGHT + "px",
            });
            this.style = <SVGStyleElement>svg.child(this.element, "style", {});
            this.style.textContent = MB_STYLE;
        	
            this.defs = <SVGDefsElement>svg.child(this.element, "defs", {});
            this.g = <SVGGElement>svg.elt("g");
            this.element.appendChild(this.g);
        	
            // filters
            let glow = svg.child(this.defs, "filter", { id: "filterglow", x: "-5%", y: "-5%", width: "120%", height: "120%" });
            svg.child(glow, "feGaussianBlur", { stdDeviation: "5", result: "glow" });
            let merge = svg.child(glow, "feMerge", {});
            for (let i = 0; i < 3; ++i) svg.child(merge, "feMergeNode", { in: "glow" })

            let neopixelglow = svg.child(this.defs, "filter", { id: "neopixelglow", x: "-300%", y: "-300%", width: "600%", height: "600%" });
            svg.child(neopixelglow, "feGaussianBlur", { stdDeviation: "4.3", result: "coloredBlur" });
            let neopixelmerge = svg.child(neopixelglow, "feMerge", {});
            svg.child(neopixelmerge, "feMergeNode", { in: "coloredBlur" })
            svg.child(neopixelmerge, "feMergeNode", { in: "coloredBlur" })
            svg.child(neopixelmerge, "feMergeNode", { in: "SourceGraphic" })

        	
            this.rgbLed = this.element.getElementById("LIGHTBULB_LED") as SVGCircleElement;
            const lcdRect = this.element.getElementById("DISPLAY_SCREEN") as SVGRectElement;
            this.lcd = <SVGImageElement>svg.child(lcdRect.parentElement, "image", { x : lcdRect.x.baseVal.value, y : lcdRect.y.baseVal.value, width: lcdRect.width.baseVal.value, height: lcdRect.height.baseVal.value })
        	
            const btnids = ["BTN_L", "BTN_R", "BTN_U", "BTN_D"];
            const btnlabels = ["Left", "Right", "Up", "Down"];
        	
            this.buttonsOuter = btnids.map((n, i) => {
                let btn = this.element.getElementById(n + "_OUTER") as SVGElement;
                accessibility.makeFocusable(btn);
                accessibility.setAria(btn, "button", btnlabels[i]);
                return btn;
            });
            
            this.buttonsOuter.forEach(b => svg.addClass(b, "sim-button-outer"));
            this.buttons = btnids.map(n => this.element.getElementById(n + "_INNER") as SVGElement);
            this.buttons.forEach(b => svg.addClass(b, "sim-button"));
        	
            
        	
        	
        	
            this.screenCanvas = document.createElement("canvas");
            */

            this.screenCanvas = document.createElement("canvas");

            const lcdRect = this.element.getElementById("DISPLAY_SCREEN") as SVGRectElement;
            this.lcd = <SVGImageElement>svg.child(lcdRect.parentElement, "image", { x: lcdRect.x.baseVal.value, y: lcdRect.y.baseVal.value, width: lcdRect.width.baseVal.value, height: lcdRect.height.baseVal.value })

            //this.lcdRectLed1 = this.element.getElementById("DISPLAY_SCREEN_LED1") as SVGRectElement;
            //this.lcdLed1 = <SVGImageElement>svg.child(this.lcdRectLed1.parentElement, "rect", { x : this.lcdRectLed1.x.baseVal.value, y : this.lcdRectLed1.y.baseVal.value, width: this.lcdRectLed1.width.baseVal.value, height: this.lcdRectLed1.height.baseVal.value })

            const btnids = ["A", "B"];
            this.buttons = btnids.map(n => this.element.getElementById("BUTTON_" + n) as SVGElement);
            this.buttons.forEach(b => pxsim.U.addClass(b, "sim-button-outer"));

            this.led = this.element.getElementById("LED") as SVGCircleElement;
        }

        private mkBtn(left: number, top: number, label: string): { outer: SVGElement, inner: SVGElement } {
            const btnr = 2;
            const btnw = 10;
            const btnn = 1.6;
            const btnnm = 2;
            const btnb = 3;
            let btng = svg.child(this.g, "g", { class: "sim-button-group" });
            accessibility.makeFocusable(btng);
            accessibility.setAria(btng, "button", label);
            svg.child(btng, "rect", { class: "sim-button-outer", x: left, y: top, rx: btnr, ry: btnr, width: btnw, height: btnw });

            const outer = btng;
            const inner = svg.child(btng, "circle", {
                class: "sim-button",
                cx: left + btnw / 2,
                cy: top + btnw / 2,
                r: btnb
            });

            return { outer, inner };
        }

        private attachEvents() {
            Runtime.messagePosted = (msg) => {
                switch (msg.type || "") {
                    case "serial": this.flashSystemLed(); break;
                }
            }

            let bpState = this.board.buttonState;
            let stateButtons = bpState.buttons;
            this.buttons.forEach((btn, index) => {
                let button = stateButtons[index];

                pointerEvents.down.forEach(evid => btn.addEventListener(evid, ev => {
                    button.setPressed(true);
                    svg.fill(this.buttons[index], this.props.theme.buttonDown);
                }))
                btn.addEventListener(pointerEvents.leave, ev => {
                    button.setPressed(false);
                    svg.fill(this.buttons[index], this.props.theme.buttonUps[index]);
                })
                btn.addEventListener(pointerEvents.up, ev => {
                    button.setPressed(false);
                    svg.fill(this.buttons[index], this.props.theme.buttonUps[index]);
                })
                accessibility.enableKeyboardInteraction(btn,
                    () => { // keydown
                        button.setPressed(true);
                        svg.fill(this.buttons[index], this.props.theme.buttonDown);
                    },
                    () => { // keyup
                        button.setPressed(false);
                        svg.fill(this.buttons[index], this.props.theme.buttonUps[index]);
                    }
                );
            })

        }
    }
}
