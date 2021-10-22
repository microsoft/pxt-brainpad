// http://files.ghielectronics.com/downloads/Schematics/FEZ/BrainPad%20BP2%20Schematic.pdf
// Chip used: STM32F401RE

namespace config {
    export const DEFAULT_BUTTON_MODE = DAL.BUTTON_ACTIVE_LOW_PULL_UP;

    //export const PIN_LIGHT = DAL.PB_1; // adc
    export const PIN_TEMPERATURE = DAL.PC_0; // adc sensor. We use channel 17 which doesn't map anywhere to pin. We use PC_0 and convert to channel 17 because we don't use PC_0.

    export const PIN_P3 = DAL.PA_1; // pwm
    export const PIN_P0 = DAL.PA_5; // pwm
    export const PIN_P4 = DAL.PA_0; // pwm
    export const PIN_P5 = DAL.PA_7; // pwm
    export const PIN_P6 = DAL.PA_4; // pwm
    export const PIN_P7 = DAL.PB_0; // pwm
    export const PIN_P1 = DAL.PA_3; // pwm
	export const PIN_P8 = DAL.PA_9; // pwm
	export const PIN_P9 = DAL.PB_1; // pwm
	export const PIN_P10 = DAL.PA_6; // pwm
	export const PIN_P11 = DAL.PB_6; // pwm
	export const PIN_P12 = DAL.PA_10; // pwm
	export const PIN_P2 = DAL.PA_2; // pwm
	export const PIN_P13 = DAL.PB_3; // pwm
	export const PIN_P14 = DAL.PB_4; // pwm
	export const PIN_P15 = DAL.PB_5; // pwm
	export const PIN_P16 = DAL.PB_12; // pwm
	
	
		
	export const PIN_SCL = DAL.PB_10; // pwm
	export const PIN_SDA = DAL.PB_11; // pwm
    // export const PIN_RX = DAL.PA_10; // pwm
    // export const PIN_TX = DAL.PA_9; // pwm

    // export const PIN_AN = DAL.PA_7; // adc
    // export const PIN_RST = DAL.PA_6; // adc
    // export const PIN_CS = DAL.PC_3; // adc
    // export const PIN_PWM = DAL.PA_3; // pwm
    //export const PIN_INT = DAL.PA_2; // adc


    // export const PIN_SCK = DAL.PB_3; //
    // export const PIN_MISO = DAL.PB_4; //
    // export const PIN_MOSI = DAL.PB_5; // 
    
    // accelerometer and screen are on the same I2C1
	export const PIN_ACCELEROMETER_SDA = DAL.PB_14; // Pulse
    export const PIN_ACCELEROMETER_SCL = DAL.PB_13; // Pulse
	
    // export const PIN_ACCELEROMETER_SDA = DAL.PB_9; //Dev
    // export const PIN_ACCELEROMETER_SCL = DAL.PB_8; //Dev
    export const PIN_ACCELEROMETER_INT = DAL.PA_14;

    //export const PIN_SERVO_1 = DAL.PA_3;
    // export const PIN_SERVO_2 = DAL.PA_0;    

    // export const PIN_BTN_LEFT = DAL.PA_15;
    // export const PIN_BTN_RIGHT = DAL.PC_13;
    // export const PIN_BTN_UP = DAL.PA_5;
    // export const PIN_BTN_DOWN = DAL.PB_10;
	
	export const PIN_BTN_A = DAL.PC_13;
	export const PIN_BTN_B = DAL.PB_7;		
}
