#include "pxt.h"
#include "Pin.h"
#include "I2C.h"

uint8_t   buffer1[1];
uint8_t   buffer2[6];

enum class Axis {
        X, Y, Z 
    };

static int DeviceAddress = 0x38;
static int OUT_X_MSB = 0x01;


namespace pxt {

class WAccel {
  public:
    CODAL_MBED::I2C i2c; 
   
    WAccel()
        : i2c(*LOOKUP_PIN(SDA), *LOOKUP_PIN(SCL))
         
    {
      i2c.setFrequency(400000);

      buffer2[0]=0x2A;
      buffer2[1]=0x01;
      i2c.write(DeviceAddress, buffer2, 2, 0); 
    }
};
SINGLETON(WAccel);
}

//% color="#0078d7" weight=97 icon="\uf1ec"
namespace input {


int getAxis(Axis axis)
{
  auto i2c = &getWAccel()->i2c;

  buffer1[0]=OUT_X_MSB; 
  i2c->write(DeviceAddress, buffer1, 1, 1); 

  i2c->read(DeviceAddress, OUT_X_MSB, buffer2, 6); 

	switch (axis) {
		case Axis :: X:{
			int x =  (int)(buffer2[0] << 2 | buffer2[1] >> 6);
			if (x > 511) x = x - 1024;
			return x;
			}
		case Axis :: Y:{
			int y =  (int)(buffer2[2] << 2 | buffer2[3] >> 6);
			if (y > 511) y = y - 1024 ;
			return  y;
			}
		case Axis :: Z:{
		   int z =  (int)(buffer2[4] << 2 | buffer2[5] >> 6);
		   if (z > 511) z = z - 1024;
		   return z;
		 }
		}
    return 0;

 }

/**
* Read Axis Y.
*/
//% blockId=accelerometer_read_axisY block="read axis Y"
//% weight=26 

int ReadY()
{
  return getAxis(Axis::Y);
} 

/**
* Read Axis X.
*/
//% blockId=accelerometer_read_axisX block="read axis X"
//% weight=26
int ReadX()
{
   return getAxis(Axis::X);
} 

/**
* Read Axis Z.
*/
//% blockId=accelerometer_read_axisZ block="read axis Z"
//% weight=26
 int ReadZ()
{
   return getAxis(Axis::Z);
}

/**
* OnShake.
*/
//% blockId=accelerometer_on_shake block="onShake"
//% weight=26
bool onShake(){
  int x = ReadX();
  int y = ReadY();
  int z = ReadZ();
  int shake = (int)sqrtf(x * x + y * y + z * z);
  if(shake > 1000) return true;
  else return false;
}

}