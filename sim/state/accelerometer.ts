namespace pxsim {
    export interface AccelBoard extends CommonBoard {
        accelState: AccelState;
       
    }

}

namespace pxsim {
    export class AccelState {
    
        GetX(){
            
        }

       GetY(){

        }
       GetZ(){

        }

       
    }
}


namespace pxsim.input {
    export function ReadX() {
       
        const acc = (board() as DalBoard).accelState;
        acc.GetX();
        runtime.queueDisplayUpdate();
    }

    export function ReadY() {
       
        const acc = (board() as DalBoard).accelState;
        acc.GetY();
        runtime.queueDisplayUpdate();
    }

    export function ReadZ() {
       
        const acc = (board() as DalBoard).accelState;
        acc.GetZ();
        runtime.queueDisplayUpdate();
    }
      
}

