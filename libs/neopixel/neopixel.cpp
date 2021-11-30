#include "pxt.h"
#include "BrainPadDisplay.h"

#define Port(port) ((GPIO_TypeDef *) (GPIOA_BASE + (port << 10)))
#define WS2812_TICK_ONE 5
#define WS2812_TICK_ZERO 2
#define WS2812_TIMER_PORT TIM3

#define WS2812_TICK_2_3 3
#define WS2812_TICK_1_3 1

#define WS2812_TICK_4_3 8

#define LOCK() uint32_t stateIrq = target_state_irq(); target_disable_irq()
#define UNLOCK() if ((stateIrq & 1) == 0) target_enable_irq()

#pragma GCC push_options
#pragma GCC optimize ("O2")

inline void WS2812_SendOne(GPIO_TypeDef* port, int32_t bit) {
    volatile int delay = WS2812_TICK_4_3;

    port->BSRR = bit;

    while (delay > 2)
        delay--;

    port->BSRR = (bit << 16);


    while (delay > 0)
        delay--;

}

inline void WS2812_SendZero(GPIO_TypeDef* port, int bit) {
    volatile int delay = WS2812_TICK_4_3;

    port->BSRR = bit;


    while (delay > 6)
        delay--;

    port->BSRR = (bit << 16);


    while (delay > 0)
        delay--;
}


namespace neopixel {


    bool init = false;

    /**
     * Flush neopixel .
     * @param dpin .
     * @param buffer.
     * @param rgb888.
     */
     //%  
    void Flush(DigitalInOutPin dpin, Buffer buffer, bool rgb888) {
        uint8_t* buffer8 = buffer->data;
        volatile int size = buffer->length;
        volatile int pin = dpin->name;

        GPIO_TypeDef* port = Port(pin >> 4);
        pin = pin & 0x0F;
        uint16_t bit = 1 << (pin);

        uint8_t data;


        LOCK();
        for (int32_t i = 0; i < size; i++) {
            data = buffer8[i];

            for (int32_t b = 7; b >= 0; b--) {
                if (data & (1 << b)) {
                    WS2812_SendOne(port, bit);
                }
                else {
                    WS2812_SendZero(port, bit);
                }
            }
        }
        UNLOCK();



    }


}

#pragma GCC pop_options