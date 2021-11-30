#include "pxt.h"
#include "Flash.h"
// This is overwrite
//#define LOG DMESG
#define LOG NOLOG

#ifdef STM32L4
namespace codal {
static void waitForLast() {
    //TODO
	// while ((FLASH->SR & FLASH_SR_BSY) == FLASH_SR_BSY)
        // ;
}

static void unlock() {
    //TODO
	// FLASH->CR |= FLASH_CR_LOCK;
    // FLASH->KEYR = FLASH_KEY1;
    // FLASH->KEYR = FLASH_KEY2;
	
	
}

static void lock() {
    //TODO
	// FLASH->CR |= FLASH_CR_LOCK;
}

int ZFlash::pageSize(uintptr_t address) {
    //TODO
	// address |= 0x08000000;
    // if (address < 0x08010000)
        // return 16 * 1024;
    // if (address < 0x08020000)
        // return 64 * 1024;
    // if (address < 0x08100000)
        // return 128 * 1024;
    // target_panic(DEVICE_FLASH_ERROR);
    return 0;
}

int ZFlash::totalSize() {
    //TODO
	//return *((uint16_t *)0x1FFF7A22) * 1024;
	
	return 0;
}

int ZFlash::erasePage(uintptr_t address) {
    //TODO
    return 0;
}

int ZFlash::writeBytes(uintptr_t dst, const void *src, uint32_t len) {
    //TODO
    return 0;
}
} // namespace codal
#endif
