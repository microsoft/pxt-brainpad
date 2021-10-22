/**
 * IR receiver (Version 0.0.4)
 *
 * Copyright (C) 2010 Shinichiro Nakamura (CuBeatSystems)
 * http://shinta.main.jp/
 */
#include "pxt.h"
#include "receiverir.h"

#define LOCK() uint32_t stateIrq = target_state_irq(); target_disable_irq()
#define UNLOCK() if ((stateIrq & 1) == 0) __enable_irq()

#define InRange(x,y)   ((((y) * 0.8) < (x)) && ((x) < ((y) * 1.2)))

const int BurstPreTime = 9000;
const int SpacePreTime = 4500;
const int BurstBitTime = 562;
const int ZeroBitTime = 562;
const int OneBitTime = 1688;
const int RepeatTime = 2250;
const int RepeatEndTime = 562;

/**
 * Constructor.
 *
 * @param rxpin Pin for receive IR signal.
 */
ReceiverIR::ReceiverIR(PinName rxpin) : evt(rxpin) {
    init_state();
	    
    evt.rise(this, &ReceiverIR::isr_rise);
	evt.fall(this, &ReceiverIR::isr_fall);
    evt.mode(PullUp);    	
}

/**
 * Destructor.
 */
ReceiverIR::~ReceiverIR() {
}

/**
 * Get data.
 *
 * @param format Pointer to format.
 * @param buf Buffer of a data.
 * @param bitlength Bit length of the buffer.
 *
 * @return Data bit length.
 */
void ReceiverIR::getData(uint8_t *buf) {
    LOCK();
    
	buf[0] = data;
	
    UNLOCK();    

}

void ReceiverIR::init_state(void) {
   
    timer.stop();
    timer.reset();
	timer.start();
   
	status = PreBurst;
	necMessage = 0;
	bitIndex = 0;
	lastTick = timer.read_us();
}

void ReceiverIR::isr_changed(void) {
	LOCK();
	int bitTime = timer.read_us() - lastTick;
	
	lastTick = timer.read_us();
	
	switch (status) {
		case PreBurst:
		
			if (InRange(bitTime, BurstPreTime)) {
				status = PostPreBurst;
				necMessage = 0;
				bitIndex = 0;
			}
		break;
		
		case PostPreBurst:
			if (InRange(bitTime, SpacePreTime))
				status = BurstBit;
			else if (InRange(bitTime, RepeatTime)) {
				status = RepeatEnd;
			}
			else {
				ErrorCounter++;
				status = PreBurst;//error, go back!
			}
		break;
		
		case RepeatEnd:
			if (InRange(bitTime, RepeatEndTime)) {
			}
			else {
				ErrorCounter++;
				status = PreBurst;//error, go back!
			}
			break;
		case BurstBit:
			if (InRange(bitTime, BurstBitTime))
				status = DataBit;
			else {
				ErrorCounter++;
				status = PreBurst;//error, go back!
			}
			break;
		case DataBit:
			status = BurstBit;
			if (InRange(bitTime, ZeroBitTime)) {
				// we have a zero
				bitIndex++;
			}
			else if (InRange(bitTime, OneBitTime)) {
				//we have a one
				necMessage |= (uint32_t)((1 << bitIndex));
				bitIndex++;
			}
			else {
				ErrorCounter++;
				status = PreBurst;//error, go back!
			}
			if (bitIndex == 32) {
				uint8_t b0 = (uint8_t)(necMessage >> 0);
				uint8_t b1 = (uint8_t)~(necMessage >> 8);
				uint8_t b2 = (uint8_t)(necMessage >> 16);
				uint8_t b3 = (uint8_t)~(necMessage >> 24);
				if ((b0 == b1) && (b2 == b3)) {					
					data = b2;					
					onReceived();
				}
				else {
					ErrorCounter++;
				}

				status = PreBurst;// we are good to restart

			}
			break;

		default:
			status = PreBurst;
			break;
	}
	 
	UNLOCK();
}


void ReceiverIR::isr_fall(void) {
    LOCK();
	
    isr_changed();
	   
    UNLOCK();
}

void ReceiverIR::isr_rise(void) {
    LOCK();
			
    volatile int i = 0;
	
	
	isr_changed();
	
	i++;
	
    UNLOCK();
}
