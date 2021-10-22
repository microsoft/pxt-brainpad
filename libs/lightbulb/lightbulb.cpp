#include "pxt.h"

namespace lightbulb {
    /**
     * Set the rgb led to a specific red, green, blue color.
     * @param red the red color
     * @param green the green color
     * @param blue the blue color
     */
     //% 
     
    void __setRGBLed(int r, int g, int b) {
        auto rp = lookupPin(PA_8);     
#define SCALE(x) min(max(0, x), 255) * 4
        rp->setAnalogValue(SCALE(r));
    }
}
