#include "pxt.h"

namespace pxt {

static bool initIsPulse = false;
static bool isPulse = false;
static void initRandomSeed() {
    int seed = 0xC0DA1;
    /*
    auto pinTemp = LOOKUP_PIN(TEMPERATURE);
    if (pinTemp)
        seed *= pinTemp->getAnalogValue();
    auto pinLight = LOOKUP_PIN(LIGHT);
    if (pinLight)
        seed *= pinLight->getAnalogValue();
    */
    seedRandom(seed);
}

void platform_init() {
    initRandomSeed();

/*
    if (*HF2_DBG_MAGIC_PTR == HF2_DBG_MAGIC_START) {
        *HF2_DBG_MAGIC_PTR = 0;
        // this will cause alignment fault at the first breakpoint
        globals[0] = (TValue)1;
    }
*/

}


bool IsPulse() {
	if (!initIsPulse) {		
		auto pin = lookupPin(PB_15);

		pin->setPull(PullMode::Down);	

		isPulse = pin->getDigitalValue();

		initIsPulse = true;		
	}
	
	return isPulse;
}


}

void cpu_clock_init() {
    // missing in Codal
}
