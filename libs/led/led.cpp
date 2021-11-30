#include "pxt.h"

namespace led {
    /**
     * Set led .
     * @param on true : on, false: off
     */
     //% 
     
    void __setLed(bool on) {
        auto rp = lookupPin(PA_8);   
		volatile int onn = 0;
		
		if (on)
			onn = 2;
		
        rp->setDigitalValue(onn > 0 ? 1 : 0);
    }
}
