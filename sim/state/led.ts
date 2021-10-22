namespace pxsim {

    export class LedState {
        private on: boolean;
		private needUpdate: boolean;
		
        animationQ: AnimationQueue;
		
		constructor(runtime: Runtime) {
            this.animationQ = new AnimationQueue(runtime);
        }
		
		setState(on: boolean) {
            this.on = on;        
        }

        getState(): boolean {
            return this.on;
        }
    }		
}


namespace pxsim.led {
    export function __setLed(on: boolean): void {
       const led = (board() as DalBoard).ledState;
        led.setState(on);
        runtime.queueDisplayUpdate();
		
    }
}