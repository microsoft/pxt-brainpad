#include "pxt.h"
#include "BrainPadDisplay.h"



namespace pxt {
    class WDisplay {
        CODAL_MBED::I2C i2c; // note that this is different pins than io->i2c
    public:
        BrainPadDisplay lcd;
        WDisplay()
            : i2c(*LOOKUP_PIN(ACCELEROMETER_SDA), *LOOKUP_PIN(ACCELEROMETER_SCL))
            , lcd(i2c)
        {
			// implement first here
		}
    };

    SINGLETON(WDisplay);
	
	static uint8_t lastImageBuffer[1024];
	static uint16_t lastImageBuffer4bppCrc;
	
	static uint8_t* GetPixelPointerFromBuffer(int x, int y, uint8_t* buffer, int width, int height, int bpp) { 
		int byteHeight = 0;
		uint8_t *d;
		
		if (bpp == 1) {
			byteHeight = (height + 7) >> 3;
			
			d = &buffer[byteHeight * x];
			
			if (y) {
				d += y>>3;
			}
		}
		else {
			 byteHeight = ((height * 4 + 31) >> 5) << 2;
			 
			 d = &buffer[byteHeight * x];
			 
			 if (y) {
				d += y>>1;
			}
		}
				
		return d;
	}
	
	static int GetPixelFromBuffer(int x, int y, uint8_t* buffer, int width, int height, int bpp) {
		auto ptr = GetPixelPointerFromBuffer(x, y, buffer, width, height, bpp);
		
		if (bpp == 4) {
			if (y & 1)
				return *ptr >> 4;
			else
				return *ptr & 0x0f;
		}
		else {
			uint8_t mask = 0x01 << (y & 7);
			return (*ptr & mask) ? 1 : 0;
		}
		
		return 0;
	}
	
	static void SetPixelToBuffer(int x, int y, uint8_t* buffer, int width, int height, int bpp, int c) {
		auto ptr = GetPixelPointerFromBuffer(x, y, buffer, width, height, bpp);
		
		if (bpp == 1) {
			uint8_t mask = 0x01 << (y & 7);
			if (c)
				*ptr |= mask;
			else
				*ptr &= ~mask;
		}
		else {
			if (y & 1)
				*ptr = (*ptr & 0x0f) | (c << 4);
			else
				*ptr = (*ptr & 0xf0) | (c & 0xf);
			
			
		}
	}
	
	static uint16_t CalCrcFromBuffer(uint8_t *data, uint32_t len) {
		uint16_t crc = 0xffff;

		while (len--) {
			crc ^= (*data++ << 8);
			for (int i = 0; i < 8; ++i) {
				if (crc & 0x8000)
					crc = crc << 1 ^ 0x1021;
				else
					crc = crc << 1;
			}
		}

		return crc;
	}
	
	void NativeClearImageBuffer() {
		for (int i = 0; i < 1024; i++) {
			lastImageBuffer[i] = 0;
		}
	}
	
	void NativeSetPixelToBuffer(int x, int y, int c) {
		SetPixelToBuffer(x, y, lastImageBuffer, LCD_WIDTH, LCD_HEIGHT, 1, c);
	}

	void NativeFlushImageBuffer() {
		auto display = getWDisplay();				
								
		display->lcd.writeScreenBuffer(lastImageBuffer);	
	}
	
    //%
    void updateScreen(Image_ img) {
         
        if (img) {
			uint8_t isDirty = false;
			
			auto crc4bpp = CalCrcFromBuffer(img->pix(), 4096);
			
			if (lastImageBuffer4bppCrc != crc4bpp) {	
				lastImageBuffer4bppCrc = crc4bpp;
				for (int x = 0; x < LCD_WIDTH; x++) {
					for (int y = 0; y < LCD_HEIGHT; y++) {
						
							auto  p = GetPixelFromBuffer(x, y, img->pix(), LCD_WIDTH, LCD_HEIGHT, 4);
													
							SetPixelToBuffer(x, y, lastImageBuffer, LCD_WIDTH, LCD_HEIGHT, 1, p);
							
						}
				}
							
				isDirty = true;			
			}
			
			if (isDirty) {
				
				if (/*img->bpp() != IMAGE_BITS || */img->width() != LCD_WIDTH || img->height() != LCD_HEIGHT)
					target_panic(906);
								
				auto display = getWDisplay();				
								
				display->lcd.writeScreenBuffer(lastImageBuffer);							
			}
        }
    }

    //%
    void updateStats(String msg) {
        // ignore...
    }
}