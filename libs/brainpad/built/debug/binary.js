pxsim.enableFloatingPoint();
pxsim.setConfigData({
 "1": 13,
 "2": 1,
 "3": 0,
 "4": 28,
 "5": 14,
 "6": 15,
 "9": 54,
 "10": 16,
 "11": 20,
 "12": 21,
 "13": 17,
 "14": 11,
 "15": 8,
 "16": 10,
 "17": 8,
 "20": 55,
 "21": 41,
 "24": 35,
 "25": 34,
 "26": 30,
 "27": 9,
 "28": 40,
 "30": 23,
 "31": 12,
 "100": 2,
 "101": 5,
 "102": 6,
 "103": 7,
 "104": 35,
 "105": 34,
 "106": 41,
 "107": 40,
 "108": 11,
 "109": 9,
 "110": 8,
 "154": 28,
 "155": 14,
 "157": 15,
 "158": 55,
 "163": 17,
 "200": 10,
 "202": 17
}, {
 "NUM_NEOPIXELS": 200,
 "DEFAULT_BUTTON_MODE": 202,
 "PIN_FLASH_MISO": 10,
 "PIN_FLASH_MOSI": 11,
 "PIN_FLASH_SCK": 12,
 "PIN_FLASH_CS": 9,
 "PIN_MIC_DATA": 17,
 "PIN_MIC_CLOCK": 16,
 "PIN_BTN_SLIDE": 6,
 "PIN_NEOPIXEL": 20,
 "PIN_SPEAKER_AMP": 26,
 "PIN_MICROPHONE": 15,
 "PIN_LIGHT": 14,
 "PIN_ACCELEROMETER_SDA": 3,
 "PIN_ACCELEROMETER_SCL": 2,
 "PIN_ACCELEROMETER_INT": 1,
 "PIN_TEMPERATURE": 27,
 "PIN_IR_OUT": 30,
 "PIN_IR_IN": 31,
 "PIN_BTN_A": 4,
 "PIN_BTN_B": 5,
 "PIN_A0": 100,
 "PIN_A1": 101,
 "PIN_A2": 102,
 "PIN_A3": 103,
 "PIN_A4": 104,
 "PIN_A5": 105,
 "PIN_A6": 106,
 "PIN_A7": 107,
 "PIN_SCL": 24,
 "PIN_SDA": 25,
 "PIN_RX": 21,
 "PIN_TX": 28,
 "PIN_A8": 108,
 "PIN_A9": 109,
 "PIN_D4": 154,
 "PIN_D5": 155,
 "PIN_D7": 157,
 "PIN_D8": 158,
 "PIN_D13": 163,
 "PIN_LED": 13,
 "PIN_A10": 110
});


var _main___P1 = entryPoint = function (s) {
var r0 = s.r0, step = s.pc;
s.pc = -1;
while (true) {
if (yieldSteps-- < 0 && maybeYield(s, step, r0)) return null;
switch (step) {
  case 0:

    r0 = globals._pollEventQueue___52;
    pxtrt.decr(r0);
    r0 = undefined;
    globals._pollEventQueue___52 = (r0);
  case 1:
    return leave(s, r0)
  default: oops()
} } }
_main___P1.info = {"start":0,"length":0,"line":0,"column":0,"endLine":0,"endColumn":0,"fileName":"pxt_modules/base/pxt-core.d.ts","functionName":"<main>"}
_main___P1.continuations = [  ]


setupDebugger(1)
