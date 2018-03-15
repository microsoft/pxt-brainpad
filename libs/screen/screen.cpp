#include "pxt.h"
#include "BrainPadDisplay.h"

namespace pxt {
    class WDisplay {
    public:
        BrainPadDisplay lcd;
        WDisplay()
            : lcd(*LOOKUP_PIN(SDA), *LOOKUP_PIN(SCL))
        {}
    };

    SINGLETON(WDisplay);

    //%
    void updateScreen(RefImage img) {
        auto display = getWDisplay();
        display->lcd.writeScreenBuffer(img.pix());
    }

    //%
    void updateStats(String msg) {
        // ignore...
    }
}