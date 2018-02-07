namespace pxsim {
    export class DisplayState {
        private xPixel: number;
        private yPixel: number;
        private xCircle: number;
        private yCircle: number;
        private xRect: number;
        private yRect: number;
        private r: number;
        private width: number;
        private height: number;

        public inited: boolean;

        Init() {
            return this.inited = false;
        }
        setPixel(xPixel: number, yPixel: number) {
            this.xPixel = xPixel;
            this.yPixel = yPixel;
        }

        SetCircle(xCircle: number, yCircle: number, r: number) {
            this.xCircle = xCircle;
            this.yCircle = yCircle;
            this.r = r;
            
        }
        GetCircle(): [number, number, number] {
            return [this.xCircle, this.yCircle, this.r];
        }

        SetRectangle(xRect: number, yRect: number, width: number, height: number) {
            this.xRect = xRect;
            this.yRect = yRect;
            this.width = width;
            this.height = height;

        }
        GetRectangle(): [number, number, number, number] {
            return [this.xRect, this.yRect, this.width, this.height];
        }

        Draw() {

        }
    }
}

namespace pxsim {
    export interface DisplayBoard extends CommonBoard{
        displayState: DisplayState;
        
    }

}

namespace pxsim.display {
    export function DisplayInit(init: boolean) {
        // Updates the simulator state
        const lcd = (board() as DalBoard).displayState;
        lcd.Init();
        runtime.queueDisplayUpdate();
    }

    export function SetPixel(x: number, y: number): void {
    }

    export function DrawCircle(x: number, y: number, r: number): void {
        const lcd = (board() as DalBoard).displayState;
        lcd.SetCircle(x, y, r);
        runtime.queueDisplayUpdate();
    }

    export function DrawRectangle(x: number, y: number, width: number, height: number): void {
        const lcd = (board() as DalBoard).displayState;
        lcd.SetRectangle(x, y, width, height);
        runtime.queueDisplayUpdate();
    }

    export function WriteScreenBuffer(): void {
        const lcd = (board() as DalBoard).displayState;
        lcd.Draw();
        runtime.queueDisplayUpdate();
    }
      
}



