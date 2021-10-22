#include "pxt.h"

namespace led {
    /**
     * Set led .
     * @param on true : on, false: off
     */
     //% 
     
    void __setLed(bool on) {
        auto rp = lookupPin(PA_8);     
        rp->setDigitalValue(on ? 1 : 0);
    }
}
