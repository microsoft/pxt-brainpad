declare namespace pins {
    //% fixedInstance shim=pxt::getPin(PIN_SCL)
    const SCL: PwmOnlyPin;
    //% fixedInstance shim=pxt::getPin(PIN_SDA)
    const SDA: PwmOnlyPin;
    //% fixedInstance shim=pxt::getPin(PIN_RX)
    const RX: PwmOnlyPin;
    //% fixedInstance shim=pxt::getPin(PIN_TX)
    const TX: PwmOnlyPin;

    //% fixedInstance shim=pxt::getPin(PA_7)
    const AN: AnalogPin;
    //% fixedInstance shim=pxt::getPin(PA_6)
    const RST: AnalogPin;
    //% fixedInstance shim=pxt::getPin(PC_3)
    const CS: AnalogPin;
    //% fixedInstance shim=pxt::getPin(PA_8)
    const PWM: PwmOnlyPin;
    //% fixedInstance shim=pxt::getPin(PA_2)
    const INT: PwmPin;

    //% fixedInstance shim=pxt::getPin(PIN_SERVO_1)
    const SERVO1: PwmPin;
    //% fixedInstance shim=pxt::getPin(PIN_SERVO_2)
    const SERVO2: PwmPin;
}


declare namespace input {
    /**
     * Left button.
     */
    //% block="button left" weight=95 fixedInstance
    //% shim=pxt::getButtonByPin(PA_15,BUTTON_ACTIVE_LOW_PULL_UP)
    const buttonLeft: Button;

    /**
     * Up button.
     */
    //% block="button up" weight=94 fixedInstance
    //% shim=pxt::getButtonByPin(PA_5,BUTTON_ACTIVE_LOW_PULL_UP)
    const buttonUp: Button;

    /**
     * Down button.
     */
    //% block="button down" weight=94 fixedInstance
    //% shim=pxt::getButtonByPin(PB_10,BUTTON_ACTIVE_LOW_PULL_UP)
    const buttonDown: Button;

    /**
     * Right button.
     */
    //% block="button right" weight=94 fixedInstance
    //% shim=pxt::getButtonByPin(PC_13,BUTTON_ACTIVE_LOW_PULL_UP)
    const buttonRight: Button;
}
