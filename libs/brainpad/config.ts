// http://files.ghielectronics.com/downloads/Schematics/FEZ/BrainPad%20BP2%20Schematic.pdf
// Chip used: STM32F401RE

namespace config {
    export const DEFAULT_BUTTON_MODE = DAL.BUTTON_ACTIVE_LOW_PULL_UP;

    export const PIN_LIGHT = DAL.PB_1; // adc
    export const PIN_TEMPERATURE = DAL.PB_0; // adc

    export const PIN_SCL = DAL.PB_6; // pwm
    export const PIN_SDA = DAL.PB_7; // pwm
    export const PIN_RX = DAL.PA_10; // pwm
    export const PIN_TX = DAL.PA_9; // pwm

    export const PIN_SCK = DAL.PB_3; //
    export const PIN_MISO = DAL.PB_4; //
    export const PIN_MOSI = DAL.PB_5; // 
    
    // accelerometer and screen are on the same I2C as external
    export const PIN_ACCELEROMETER_SDA = PIN_SDA;
    export const PIN_ACCELEROMETER_SCL = PIN_SCL;
    //export const PIN_ACCELEROMETER_INT = NC;
}
