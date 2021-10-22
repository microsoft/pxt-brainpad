/**
 * IR receiver (Version 0.0.4)
 *
 * Copyright (C) 2010 Shinichiro Nakamura (CuBeatSystems)
 * http://shinta.main.jp/
 */

#ifndef _RECEIVER_IR_H_
#define _RECEIVER_IR_H_

#include <mbed.h>

#include "remoteir.h"

/**
 * IR receiver class.
 */
class ReceiverIR {
public:

	uint64_t lastTick;
	uint32_t necMessage;
	int32_t bitIndex;
	uint32_t ErrorCounter;
	
    /**
     * Constructor.
     *
     * @param rxpin Pin for receive IR signal.
     */
    explicit ReceiverIR(PinName rxpin);
    
    /**
     * Destructor.
     */
    ~ReceiverIR();

	typedef enum {
		PreBurst,
		PostPreBurst,
		RepeatEnd,
		BurstBit,
		DataBit,
	} Status;
	
	Status status; 
    
    
    /**
     * Get data.
     *
     * @param format Pointer to format.
     * @param buf Buffer of a data.
     * @param bitlength Bit length of the buffer.
     *
     * @return Data bit length.
     */
    void getData(uint8_t *buf);
	void(*onReceived)(); 
    
private:
     
    InterruptIn evt;    /**< Interrupt based input for input. */
    mbed::Timer timer;        /**< Timer for WDT. */
    Ticker ticker;      /**< Tciker for tick. */
    Timeout timeout;    /**< Timeout for tail. */
	uint8_t data;

    void init_state(void);

    void isr_wdt(void);
    void isr_fall(void);
    void isr_rise(void);
    void isr_changed(void);
	
    
    
};

#endif
