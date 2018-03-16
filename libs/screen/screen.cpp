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

    static Image_ lastImg;
    //%
    void updateScreen(Image_ img) {
        if (img && img != lastImg) {
            decrRC(lastImg);
            incrRC(img);
            lastImg = img;
        }

        if (lastImg && lastImg->isDirty()) {
            if (lastImg->bpp() != 1 || lastImg->width() != LCD_WIDTH || lastImg->height() != LCD_HEIGHT)
                target_panic(906);
            lastImg->clearDirty();
            auto display = getWDisplay();
            display->lcd.writeScreenBuffer(lastImg->pix());
        }
    }

    //%
    void updateStats(String msg) {
        // ignore...
    }
}