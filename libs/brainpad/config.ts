// http://files.ghielectronics.com/downloads/Schematics/FEZ/BrainPad%20BP2%20Schematic.pdf

namespace config {
    export const DEFAULT_BUTTON_MODE = DAL.BUTTON_ACTIVE_LOW_PULL_UP;

    export const PIN_LIGHT = DAL.PB_1;
    export const PIN_TEMPERATURE = DAL.PB_0;

    export const PIN_BTN_A = DAL.PA_15;
    export const PIN_BTN_B = DAL.PA_5;
    export const PIN_BTN_C = DAL.PC_13;
    export const PIN_BTN_D = DAL.PB_10;

    export const PIN_SCL = DAL.PB_6;
    export const PIN_SDA = DAL.PB_7;
    export const PIN_RX = DAL.PA_10;
    export const PIN_TX = DAL.PA_9;

    export const PIN_AN = DAL.PA_7;
    export const PIN_RST = DAL.PA_6;
    export const PIN_CS = DAL.PC_3;
    export const PIN_SCK = DAL.PB_3;
    export const PIN_MISO = DAL.PB_4;
    export const PIN_MOSI = DAL.PB_5;
    export const PIN_PWM = DAL.PA_8;
    export const PIN_INT = DAL.PA_2;
    
    export const PIN_ACCELEROMETER_SDA = PIN_SDA;
    export const PIN_ACCELEROMETER_SCL = PIN_SCL;
    //export const PIN_ACCELEROMETER_INT = NC;

    // LCD also on the same I2C

    export const PIN_LED_R = DAL.PC_9;
    export const PIN_LED_G = DAL.PC_8;
    export const PIN_LED_B = DAL.PC_6;

    export const PIN_SERVO_1 = DAL.PA_3;
    export const PIN_SERVO_2 = DAL.PA_0;

    export const PIN_BUZZER = DAL.PB_8;

    //export const PIN_LED = DAL.PA17;
}
