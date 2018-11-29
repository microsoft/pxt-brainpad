#include "pxt.h"

namespace pxt {

void platform_init() {

}

}

int target_seed_random(uint32_t rand)
{
    return codal::seed_random(rand);
}

void cpu_clock_init() {
    // missing in Codal
}
