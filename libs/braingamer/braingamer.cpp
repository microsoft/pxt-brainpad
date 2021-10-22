#include "pxt.h"

namespace braingamer {
    /**
     * Set Vibrate .
     * @param on true : on, false: off
     */
     //%      
    void __setVibrate(bool on) {
        auto vibrate = lookupPin(PA_9);     
        vibrate->setDigitalValue(on ? 0 : 33);
    }
}
