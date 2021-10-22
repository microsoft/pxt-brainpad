namespace pxsim {

    // export class LedState {
        // private on: boolean;
		
        // setState(on: boolean) {
            // this.on = on;        
        // }

        // getState(): boolean {
            // return this.on;
        // }
    // }
	
	export class Image extends RefObject {
        public height: number;
        public width: number;
        public data: number[];
        constructor(width: number, data: number[]) {
            super();
            this.width = width;
            this.data = data;
            this.height = (this.data.length / this.width) | 0;
        }
        // public print() {
            // console.debug(`Image id:${this.id} size:${this.width}x${this.height}`)
        // }
        public get(x: number, y: number): number {
            x = x | 0;
            y = y | 0;
            if (x < 0 || x >= this.width || y < 0 || y >= this.height) return 0;
            return this.data[y * this.width + x];
        }
        // public set(x: number, y: number, v: number) {
            // x = x | 0;
            // y = y | 0;
            // if (x < 0 || x >= this.width || y < 0 || y >= this.height) return;
            // this.data[y * this.width + x] = Math.max(0, Math.min(255, v));
        // }
        // public copyTo(xSrcIndex: number, length: number, target: Image, xTargetIndex: number): void {
            // xSrcIndex = xSrcIndex | 0;
            // length = length | 0;
            // xTargetIndex = xTargetIndex | 0;
            // for (let x = 0; x < length; x++) {
                // for (let y = 0; y < this.height; y++) {
                    // let value = this.get(xSrcIndex + x, y);
                    // target.set(xTargetIndex + x, y, value);
                // }
            // }
        // }
        // public shiftLeft(cols: number) {
            // cols = cols | 0;
            // for (let x = 0; x < this.width; ++x)
                // for (let y = 0; y < this.height; ++y)
                    // this.set(x, y, x < this.width - cols ? this.get(x + cols, y) : 0);
        // }

        // public shiftRight(cols: number) {
            // cols = cols >> 0;
            // for (let x = this.width - 1; x >= 0; --x)
                // for (let y = 0; y < this.height; ++y)
                    // this.set(x, y, x >= cols ? this.get(x - cols, y) : 0);
        // }

        // public clear(): void {
            // for (let i = 0; i < this.data.length; ++i)
                // this.data[i] = 0;
        // }
    }
}

namespace pxsim.display {    		
	let needMatrixLedUpDate:boolean;
	
	export function getMatrixLedUpdateState() : boolean {
		return needMatrixLedUpDate;
	}
	
	export function setMatrixLedUpdateState(state: boolean) : void {
		needMatrixLedUpDate = state;
	}
	
	export function __setMatrixLeds(leds: Image, interval: number): void {
		// const ledMatrix = (board() as DalBoard).matrixLedState;

		// for (let y = 0; y < leds.height; y++) 
		// {
			// for (let x = 0; x < leds.width; x++) {
				// if (leds.get(x, y) != 0)
				// {
					// ledMatrix[y * leds.width + x].setState(true);
				// }
				// else {
					// ledMatrix[y * leds.width + x].setState(false);
				// }
			// }
		// }
				
		
		// let cb = getResume();
        // let first = true;
		// interval = 400;
		// ledMatrix[0].animationQ.enqueue({
            // interval,
            // frame: () => {
                // if (first) {
					// setMatrixLedUpdateState(true);                    
                    // first = false;
                    // return true;
                // }
                // return false;
            // },
		// whenDone: cb
        // })
		
		
		
    }
	
	export function setMatrixLeds(leds: number, interval: boolean): void {
		
	}
	
	
}