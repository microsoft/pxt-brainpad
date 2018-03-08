#include "pxt.h"
#include "Pin.h"
#include "I2C.h"
#include "ManagedString.h"



static uint8_t Data[3];

static uint8_t ScreenBuffer[1024];
static int DeviceAddress = 0x78;

ManagedString printingText;

namespace pxt {

class WDisplay {
  public:
    CODAL_MBED::I2C i2c; 
   
    WDisplay()
        : i2c(*LOOKUP_PIN(SDA), *LOOKUP_PIN(SCL))
         
    {
      i2c.setFrequency(400000);
    }
};
SINGLETON(WDisplay);
}

//% color="#0078d7" weight=97 icon="\uf1ec"
namespace display {

    void Ssd1306_command(int cmd) {
            auto i2c = &getWDisplay()->i2c;
            
            Data[1] = cmd;
            i2c->write(DeviceAddress, Data, 2, 0);
   }

void ClearScreenBuffer()
{
    for (int x=0; x<1024; x++) {
        ScreenBuffer[x]=0;
    }
    auto i2c = &getWDisplay()->i2c;
    i2c->write(DeviceAddress, ScreenBuffer, 1024, 0);
}
    
/**
* Init Display.
*/
//% blockId=display_init block="DisplayInit"
//% weight=26

void DisplayInit(){
      Ssd1306_command(0xae);// SSD1306_DISPLAYOFF);                    // 0xAE
      Ssd1306_command(0xd5);// SSD1306_SETDISPLAYCLOCKDIV);            // 0xD5
      Ssd1306_command(0x80);                                  // the suggested ratio 0x80

      Ssd1306_command(0xa8);// SSD1306_SETMULTIPLEX);                  // 0xA8
      Ssd1306_command(64 - 1);

      Ssd1306_command(0xd3);// SSD1306_SETDISPLAYOFFSET);              // 0xD3
      Ssd1306_command(0x0);                                   // no offset
      Ssd1306_command(0x40);// SSD1306_SETSTARTLINE | 0x0);            // line #0
      Ssd1306_command(0x8d);// SSD1306_CHARGEPUMP);                    // 0x8D

      Ssd1306_command(0x14);
                    

       Ssd1306_command(0x20);// SSD1306_MEMORYMODE);                    // 0x20
       Ssd1306_command(0x00);                                  // 0x0 act like ks0108
       Ssd1306_command(0xa1);// SSD1306_SEGREMAP | 0x1);
       Ssd1306_command(0xc8);// SSD1306_COMSCANDEC);


      Ssd1306_command(0xda);// SSD1306_SETCOMPINS);                    // 0xDA
      Ssd1306_command(0x12);
      Ssd1306_command(0x81);// SSD1306_SETCONTRAST);                   // 0x81

                   
      Ssd1306_command(0xCF);
                    //}

      Ssd1306_command(0xd9);// SSD1306_SETPRECHARGE);                  // 0xd9

      Ssd1306_command(0xF1);
                 
      Ssd1306_command(0xd8);// SSD1306_SETVCOMDETECT);                 // 0xDB
      Ssd1306_command(0x40);
      Ssd1306_command(0xa4);//SSD1306_DISPLAYALLON_RESUME);           // 0xA4
      Ssd1306_command(0xa6);// SSD1306_NORMALDISPLAY);                 // 0xA6

      Ssd1306_command(0x2e);// SSD1306_DEACTIVATE_SCROLL);

      Ssd1306_command(0xaf);// SSD1306_DISPLAYON);//--turn on oled panel


      Ssd1306_command(0x21);// SSD1306_COLUMNADDR);
      Ssd1306_command(0);   // Column start address (0 = reset)
      Ssd1306_command(128 - 1); // Column end address (127 = reset)
      Ssd1306_command(0x22);// SSD1306_PAGEADDR);
      Ssd1306_command(0); // Page start address (0 = reset)
      Ssd1306_command(7); // Page end address

      ClearScreenBuffer();

  }

/**
* Init Display.
*/
//% blockId=display_write_buffer block="Draw Buffer"
//% weight=26

void WriteScreenBuffer()
{
    auto i2c = &getWDisplay()->i2c;
    for (int y=0; y<8; y++) {
        Data[0]=0x00;
        Data[1]=0xB0+y;
       i2c->write(DeviceAddress, Data, 2, 0);     //Set GDDRAM page.
     
        Data[0]=0x40;
        i2c->write(DeviceAddress, Data, 1, 1);     //Tell controller next bytes are GDDRAM data.
       
        i2c->write(DeviceAddress, ScreenBuffer+128*y, 128, 0);
        
    }
}

void Pixel(int x, int y, bool set) 
{
	  if (x >= 0 && x < 128 && y >= 0 && y < 64) {
		if (set) {
			ScreenBuffer[(x + (y / 8) * 128) + 1] |= (1 << (y % 8)); 
		}
         else 
        {
		   ScreenBuffer[(x + (y / 8) * 128) + 1] &= (~(1 << (y % 8)));
		}
    
	  }
}

/**
* Set Pixel.
*/
//% blockId=display_set_pixel block="set pixel at x %x| y %y"
//% weight=26

void SetPixel(int x, int y) 
{
    Pixel(x, y, true);
}

/**
* Draw circle.
*/
//% blockId=display_draw_circle block="draw circle at x %x| y %y| r %r"
//% weight=26
void DrawCircle(int x0, int y0, int radius)
 {
  int x = 0, y = radius;
	int dp = 1 - radius;
	do {
		if (dp < 0)
			dp = dp + 2 * (++x) + 3;
		else
			dp = dp + 2 * (++x) - 2 * (--y) + 5;

		SetPixel(x0 + x, y0 + y);     //For the 8 octants
		SetPixel(x0 - x, y0 + y);
		SetPixel(x0 + x, y0 - y);
		SetPixel(x0 - x, y0 - y);
		SetPixel(x0 + y, y0 + x);
		SetPixel(x0 - y, y0 + x);
		SetPixel(x0 + y, y0 - x);
		SetPixel(x0 - y, y0 - x);

	} while (x < y);

  SetPixel(x0 + radius, y0);
  SetPixel(x0, y0 + radius);
  SetPixel(x0 - radius, y0);
  SetPixel(x0, y0 - radius);
  WriteScreenBuffer();
}

/**
* Draw rectangle.
*/
//% blockId=display_draw_rectangle block="draw rectangle at x %x| y %y| width %width| height %height"
//% weight=26
void DrawRectangle(int x, int y, int width, int height) 
   {
     if (width < 0) return;
     if (height < 0) return;

     for (int i = x; i < x + width; i++) 
     {
       SetPixel(i, y);
       SetPixel(i, y + height - 1);
     }

     for (int i = y; i < y + height; i++)
     {
       SetPixel(x, i);
       SetPixel(x + width - 1, i);
     }            
       WriteScreenBuffer();
   }

void ClearPartOfScreen(int x, int y, int width, int height) {
            if (x == 0 && y == 0 && width == 128 && height == 64) ClearScreenBuffer();
            for (int lx = x; lx < width + x; lx++)
                for (int ly = y; ly < height + y; ly++)
                    Pixel(lx, ly, false);
        }

uint8_t * font = new uint8_t[95 * 5] {
            0x00, 0x00, 0x00, 0x00, 0x00, /* Space	0x20 */
            0x00, 0x00, 0x4f, 0x00, 0x00, /* ! */
            0x00, 0x07, 0x00, 0x07, 0x00, /* " */
            0x14, 0x7f, 0x14, 0x7f, 0x14, /* # */
            0x24, 0x2a, 0x7f, 0x2a, 0x12, /* $ */
            0x23, 0x13, 0x08, 0x64, 0x62, /* % */
            0x36, 0x49, 0x55, 0x22, 0x20, /* & */
            0x00, 0x05, 0x03, 0x00, 0x00, /* ' */
            0x00, 0x1c, 0x22, 0x41, 0x00, /* ( */
            0x00, 0x41, 0x22, 0x1c, 0x00, /* ) */
            0x14, 0x08, 0x3e, 0x08, 0x14, /* // */
            0x08, 0x08, 0x3e, 0x08, 0x08, /* + */
            0x50, 0x30, 0x00, 0x00, 0x00, /* , */
            0x08, 0x08, 0x08, 0x08, 0x08, /* - */
            0x00, 0x60, 0x60, 0x00, 0x00, /* . */
            0x20, 0x10, 0x08, 0x04, 0x02, /* / */
            0x3e, 0x51, 0x49, 0x45, 0x3e, /* 0		0x30 */
            0x00, 0x42, 0x7f, 0x40, 0x00, /* 1 */
            0x42, 0x61, 0x51, 0x49, 0x46, /* 2 */
            0x21, 0x41, 0x45, 0x4b, 0x31, /* 3 */
            0x18, 0x14, 0x12, 0x7f, 0x10, /* 4 */
            0x27, 0x45, 0x45, 0x45, 0x39, /* 5 */
            0x3c, 0x4a, 0x49, 0x49, 0x30, /* 6 */
            0x01, 0x71, 0x09, 0x05, 0x03, /* 7 */
            0x36, 0x49, 0x49, 0x49, 0x36, /* 8 */
            0x06, 0x49, 0x49, 0x29, 0x1e, /* 9 */
            0x00, 0x36, 0x36, 0x00, 0x00, /* : */
            0x00, 0x56, 0x36, 0x00, 0x00, /* ; */
            0x08, 0x14, 0x22, 0x41, 0x00, /* < */
            0x14, 0x14, 0x14, 0x14, 0x14, /* = */
            0x00, 0x41, 0x22, 0x14, 0x08, /* > */
            0x02, 0x01, 0x51, 0x09, 0x06, /* ? */
            0x3e, 0x41, 0x5d, 0x55, 0x1e, /* @		0x40 */
            0x7e, 0x11, 0x11, 0x11, 0x7e, /* A */
            0x7f, 0x49, 0x49, 0x49, 0x36, /* B */
            0x3e, 0x41, 0x41, 0x41, 0x22, /* C */
            0x7f, 0x41, 0x41, 0x22, 0x1c, /* D */
            0x7f, 0x49, 0x49, 0x49, 0x41, /* E */
            0x7f, 0x09, 0x09, 0x09, 0x01, /* F */
            0x3e, 0x41, 0x49, 0x49, 0x7a, /* G */
            0x7f, 0x08, 0x08, 0x08, 0x7f, /* H */
            0x00, 0x41, 0x7f, 0x41, 0x00, /* I */
            0x20, 0x40, 0x41, 0x3f, 0x01, /* J */
            0x7f, 0x08, 0x14, 0x22, 0x41, /* K */
            0x7f, 0x40, 0x40, 0x40, 0x40, /* L */
            0x7f, 0x02, 0x0c, 0x02, 0x7f, /* M */
            0x7f, 0x04, 0x08, 0x10, 0x7f, /* N */
            0x3e, 0x41, 0x41, 0x41, 0x3e, /* O */
            0x7f, 0x09, 0x09, 0x09, 0x06, /* P		0x50 */
            0x3e, 0x41, 0x51, 0x21, 0x5e, /* Q */
            0x7f, 0x09, 0x19, 0x29, 0x46, /* R */
            0x26, 0x49, 0x49, 0x49, 0x32, /* S */
            0x01, 0x01, 0x7f, 0x01, 0x01, /* T */
            0x3f, 0x40, 0x40, 0x40, 0x3f, /* U */
            0x1f, 0x20, 0x40, 0x20, 0x1f, /* V */
            0x3f, 0x40, 0x38, 0x40, 0x3f, /* W */
            0x63, 0x14, 0x08, 0x14, 0x63, /* X */
            0x07, 0x08, 0x70, 0x08, 0x07, /* Y */
            0x61, 0x51, 0x49, 0x45, 0x43, /* Z */
            0x00, 0x7f, 0x41, 0x41, 0x00, /* [ */
            0x02, 0x04, 0x08, 0x10, 0x20, /* \ */
            0x00, 0x41, 0x41, 0x7f, 0x00, /* ] */
            0x04, 0x02, 0x01, 0x02, 0x04, /* ^ */
            0x40, 0x40, 0x40, 0x40, 0x40, /* _ */
            0x00, 0x00, 0x03, 0x05, 0x00, /* `		0x60 */
            0x20, 0x54, 0x54, 0x54, 0x78, /* a */
            0x7F, 0x44, 0x44, 0x44, 0x38, /* b */
            0x38, 0x44, 0x44, 0x44, 0x44, /* c */
            0x38, 0x44, 0x44, 0x44, 0x7f, /* d */
            0x38, 0x54, 0x54, 0x54, 0x18, /* e */
            0x04, 0x04, 0x7e, 0x05, 0x05, /* f */
            0x08, 0x54, 0x54, 0x54, 0x3c, /* g */
            0x7f, 0x08, 0x04, 0x04, 0x78, /* h */
            0x00, 0x44, 0x7d, 0x40, 0x00, /* i */
            0x20, 0x40, 0x44, 0x3d, 0x00, /* j */
            0x7f, 0x10, 0x28, 0x44, 0x00, /* k */
            0x00, 0x41, 0x7f, 0x40, 0x00, /* l */
            0x7c, 0x04, 0x7c, 0x04, 0x78, /* m */
            0x7c, 0x08, 0x04, 0x04, 0x78, /* n */
            0x38, 0x44, 0x44, 0x44, 0x38, /* o */
            0x7c, 0x14, 0x14, 0x14, 0x08, /* p		0x70 */
            0x08, 0x14, 0x14, 0x14, 0x7c, /* q */
            0x7c, 0x08, 0x04, 0x04, 0x00, /* r */
            0x48, 0x54, 0x54, 0x54, 0x24, /* s */
            0x04, 0x04, 0x3f, 0x44, 0x44, /* t */
            0x3c, 0x40, 0x40, 0x20, 0x7c, /* u */
            0x1c, 0x20, 0x40, 0x20, 0x1c, /* v */
            0x3c, 0x40, 0x30, 0x40, 0x3c, /* w */
            0x44, 0x28, 0x10, 0x28, 0x44, /* x */
            0x0c, 0x50, 0x50, 0x50, 0x3c, /* y */
            0x44, 0x64, 0x54, 0x4c, 0x44, /* z */
            0x08, 0x36, 0x41, 0x41, 0x00, /* { */
            0x00, 0x00, 0x77, 0x00, 0x00, /* | */
            0x00, 0x41, 0x41, 0x36, 0x08, /* } */
            0x08, 0x08, 0x2a, 0x1c, 0x08  /* ~ */
        };


void DrawSymbol(int x, int y, char letter, int HScale, int VScale) 
{
     int index = 5 * (letter - 32);

         for (int h = 0; h < 5; h++) {
             for (int hs = 0; hs < HScale; hs++) {
                 for (int v = 0; v < 8; v++) {
                     int show = (font[index + h] & (1 << v)) != 0;
                     for (int vs = 0; vs < VScale; vs++) {
                         Pixel(x + (h * HScale) + hs, y + (v * VScale) + vs, show);
                     }
                 }
             }
         }
     ClearPartOfScreen(x + 5 * HScale, y, HScale, 8 * VScale);// clear the space between characters
}

///**
//* Add text.
//*/
////% blockId=display_add_text block="add text at x %x| y %y| s%s"
////% weight=26
void DrawText(int x, int y, ManagedString s) { //error: 'string' has not been declared
            int HScale = 2;
            int VScale = 2;
            int originalX = x;
            if (HScale == 0 || VScale == 0) return;
            if (s == "") return;
            char text[s.length()+1];
            strcpy(text, s.toCharArray());
           
            //const size_t length = sizeof(s);

            for (int i = 0; i < s.length(); i++) {
                if (text[i] >= 32) {
                    DrawSymbol(x, y, text[i], HScale, VScale);
                    x += (6 * HScale);

                }
                else {
                    if (text[i] == '\n') {
                        y += (9 * VScale);
                    }
                    if (text[i] == '\r') {
                        x = originalX;
                    }
                }
            }
        }


   
   

}

