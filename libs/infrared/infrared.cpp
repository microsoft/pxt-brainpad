#include "pxt.h"
#include <map>
#include <vector>
#include "receiverir.h"
using namespace pxt;

typedef struct {
	vector<Action> vec;
} vA;

enum class Pins{
  P0=  5,
  P1=  3,
  P2=  2,
  P3=  1,
  P4=  0,
  P5=  7,
  P6=  4,
  P7=  16,
  P8=  9,
  P9=  17,
  P10= 6,
  P11= 22,
  P12= 10,
  P13= 19,
  P14= 20,
  P15= 21,
  P16= 28,
  P19= 26,
  P20= 27
};

enum class RemoteButton {
  PowerOff = 0,
  Up = 1,
  PowerOn = 2,
  Left = 4,
  Center = 5,
  Right = 6,
  Back = 8,
  Down = 9,
  Next = 10,
  Plus = 12,
  Zero = 13,
  Minus = 14,
  One = 16,
  Two = 17,
  Three = 18,
  Four = 20,
  Five = 21,
  Six = 22,
  Seven = 24,
  Eight = 25,
  Nine = 26
};

namespace infrared { 

  map<RemoteButton, vA> actions;
  map<RemoteButton, uint32_t> lastact;
  mbed::Timer tsb; 
  uint8_t buf[1];
  uint32_t now;
  ReceiverIR *rx;
  RemoteIR::Format fmt = RemoteIR::UNKNOWN;

  
  void cA(vA runner){
	  for(unsigned int i=0;i<runner.vec.size();i++)
	  {
		  runAction0(runner.vec[i]);
		} 
	}

  void onReceivable(){
    rx->getData(buf);
    
    now = tsb.read_ms();
    
	if(now - lastact[(RemoteButton)buf[0]] < 100) 
		return;
    
	lastact[(RemoteButton)buf[0]] = now;
    
	cA(actions[(RemoteButton)buf[0]]); 
	
	
  }
 

  //%
  void init(Pins pin){
    rx = new ReceiverIR((PinName)pin);
	rx->onReceived = &onReceivable;
    tsb.start(); //interrupt timer for debounce
	buf[0] = 100;
	
  }
  
  //%
  int readkey(Pins pin){
    return buf[0];

  }
  
  //%
  void clearkey(Pins pin){	
	buf[0] = 100; // reset key
  }

  //% 
  void onPressEvent(RemoteButton btn, Action body) {
	actions[btn].vec.push_back(body);
  }

}