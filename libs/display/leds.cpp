#include "pxt.h"
#include "BrainPadDisplay.h"

namespace display {
#define BRAINPAD_TICK_LED1 PB_14
#define BRAINPAD_TICK_LED2 PA_10
#define BRAINPAD_TICK_LED3 PA_14
#define BRAINPAD_TICK_LED4 PA_15
#define BRAINPAD_TICK_LED5 PA_8
#define BRAINPAD_TICK_LED6 PB_13
#define BRAINPAD_TICK_LED7 PB_15
#define BRAINPAD_TICK_LED8 PB_6
#define BRAINPAD_TICK_LED9 PA_13
#define BRAINPAD_TICK_LED10 PC_14
#define BRAINPAD_TICK_LED11 PB_12
#define BRAINPAD_TICK_LED12 PB_2
#define BRAINPAD_TICK_LED13 PH_3
#define BRAINPAD_TICK_LED14 PC_15
#define BRAINPAD_TICK_LED15 PB_8
#define BRAINPAD_TICK_LED16 PB_1
#define BRAINPAD_TICK_LED17 PB_0
#define BRAINPAD_TICK_LED18 PA_4
#define BRAINPAD_TICK_LED19 PH_1
#define BRAINPAD_TICK_LED20 PB_9
#define BRAINPAD_TICK_LED21 PA_7
#define BRAINPAD_TICK_LED22 PA_6
#define BRAINPAD_TICK_LED23 PA_1
#define BRAINPAD_TICK_LED24 PA_0	
#define BRAINPAD_TICK_LED25 PH_0
	
	bool init = false;
	int isPulse;
	
	_mbed::Pin* pixel[25];  
	
	/**
     * Set leds .
     * @param leds .
     * @param interval.
     */
	//%  
    void setMatrixLeds(int led, bool value) {
		if (!init) {
			
			init = true;
			
			if (!pxt::IsPulse()) {
				auto en = lookupPin(PA_9);	
				
				en->setDigitalValue(1);
				
				const uint32_t pinArray[] = { BRAINPAD_TICK_LED1 , BRAINPAD_TICK_LED2 , BRAINPAD_TICK_LED3 , BRAINPAD_TICK_LED4 , BRAINPAD_TICK_LED5 ,
									  BRAINPAD_TICK_LED6 , BRAINPAD_TICK_LED7 , BRAINPAD_TICK_LED8 , BRAINPAD_TICK_LED9 , BRAINPAD_TICK_LED10,
									  BRAINPAD_TICK_LED11, BRAINPAD_TICK_LED12, BRAINPAD_TICK_LED13, BRAINPAD_TICK_LED14, BRAINPAD_TICK_LED15, 
									  BRAINPAD_TICK_LED16, BRAINPAD_TICK_LED17, BRAINPAD_TICK_LED18, BRAINPAD_TICK_LED19, BRAINPAD_TICK_LED20,
									  BRAINPAD_TICK_LED21, BRAINPAD_TICK_LED22, BRAINPAD_TICK_LED23, BRAINPAD_TICK_LED24, BRAINPAD_TICK_LED25};
				for (int i = 0; i < 25; i++) {						
					pixel[i] = new _mbed::Pin(0, pinArray[i], PIN_CAPABILITY_DIGITAL);
				}
			}
		}
       
	   
		if (!pxt::IsPulse()) {			
			if (led < 0)
				return;
			
			if (led > 66)
				return;

			pixel[led]->setDigitalValue(value);
		}
		else {
			if (value == 0)
				return ;
			
			
			const int ledWidth =  (64 / 5);
			const int ledHeight = (64 / 5);
			
			int xSrc = (led % 5);
			int ySrc = (led / 5);
			
			int xDest = xSrc * ledWidth;
			int yDest = ySrc * ledHeight;
			
			int xStart = xDest + 34 + 1;
			int xEnd = xStart + ledWidth-1;
			
			int yStart = yDest+1;
			int yEnd = yStart + ledHeight-1;
			
			for (int y = yStart; y < yEnd; y++) {
				for (int x = xStart; x < xEnd; x++) {
					pxt::NativeSetPixelToBuffer(x, y, 1);
				}
			}
		}
	   	 	  	   
    }
	
	/**
     * Draws an image on the LED screen.
     * @param leds the pattern of LED to turn on/off
     * @param interval time in milliseconds to pause after drawing
     */
    //% weight=95 blockGap=8
    //% imageLiteral=1 async
    //% blockId=display_show_leds
    //% block="show leds"
	//% group="Virtual Leds"	
    void __setMatrixLeds(ImageLiteral_ leds, int interval = 400) {
	  
	  uint8_t* ptr = (uint8_t*)imageBytes(leds);
	  
	  ptr += 6; // byte 6th is raw data;
	  
	  pxt::NativeClearImageBuffer();
	  
	  for (int i = 0; i < 25; i++) {	
		if (ptr[i] != 0) 					
			setMatrixLeds(i, 1);						
		else 
			setMatrixLeds(i, 0);		
	  }

	  pxt::NativeFlushImageBuffer();
    }
	
	/**
     * Draws an image on the LED screen.
     * @param leds the pattern of LED to turn on/off
     * @param interval time in milliseconds to pause after drawing
     */
    //% weight=94 blockGap=8    
    //% blockId=display_clear_leds
    //% block="clear leds"
	//% group="Virtual Leds"	
    void __ClearMatrixLeds() {	  	  
	  pxt::NativeClearImageBuffer();
	   
	  for (int i = 0; i < 25; i++) {	
		setMatrixLeds(i, 0);
	  }
	  
	  pxt::NativeFlushImageBuffer();

    }
					
}

