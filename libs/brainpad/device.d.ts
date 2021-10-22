declare namespace pins {
    //% fixedInstance shim=pxt::getPin(PIN_P0)
	const P0: PwmPin;
	
	//% fixedInstance shim=pxt::getPin(PIN_P1)
	const P1: PwmPin;
	
	//% fixedInstance shim=pxt::getPin(PIN_P2)
	const P2: PwmPin;
	
	//% fixedInstance shim=pxt::getPin(PIN_P3)
	const P3: PwmPin;
	
	//% fixedInstance shim=pxt::getPin(PIN_P4)
	const P4: AnalogInPin;
	
	//% fixedInstance shim=pxt::getPin(PIN_P5)
	const P5: AnalogInPin;
	
	//% fixedInstance shim=pxt::getPin(PIN_P6)
	const P6: AnalogInPin;
	
	//% fixedInstance shim=pxt::getPin(PIN_P7)
	const P7: AnalogInPin;
	
	//% fixedInstance shim=pxt::getPin(PIN_P8)
	const P8: PwmOnlyPin;
	
	//% fixedInstance shim=pxt::getPin(PIN_P9)
	const P9: AnalogInPin;
	
	//% fixedInstance shim=pxt::getPin(PIN_P10)
	const P10: AnalogInPin;
	
	//% fixedInstance shim=pxt::getPin(PIN_P11)
	const P11: DigitalInOutPin;
	
	//% fixedInstance shim=pxt::getPin(PIN_P12)
	const P12: PwmOnlyPin;
	
	//% fixedInstance shim=pxt::getPin(PIN_P13)
	const P13: DigitalInOutPin;
	
	//% fixedInstance shim=pxt::getPin(PIN_P14)
	const P14: DigitalInOutPin;
	
	//% fixedInstance shim=pxt::getPin(PIN_P15)
	const P15: DigitalInOutPin;
	
	//% fixedInstance shim=pxt::getPin(PIN_P16)
	const P16: DigitalInOutPin;
    	
	//% fixedInstance shim=pxt::getPin(PIN_SCL)
    const SCL: DigitalInOutPin;
    //% fixedInstance shim=pxt::getPin(PIN_SDA)
    const SDA: DigitalInOutPin;
   /*
    //% fixedInstance shim=pxt::getPin(PIN_RX)
    const RX1: PwmOnlyPin;
    //% fixedInstance shim=pxt::getPin(PIN_TX)
    const TX1: PwmOnlyPin;

    //% fixedInstance shim=pxt::getPin(PA_7)
    const AN1: AnalogPin;
    //% fixedInstance shim=pxt::getPin(PA_6)
    const RST1: AnalogPin;
    //% fixedInstance shim=pxt::getPin(PC_3)
    const CS1: AnalogPin;
    //% fixedInstance shim=pxt::getPin(PA_8)
    const PWM1: PwmOnlyPin;
    //% fixedInstance shim=pxt::getPin(PA_2)
    const INT1: PwmPin;

    //% fixedInstance shim=pxt::getPin(PIN_SERVO_1)
    const SERVO11: PwmPin;
    //% fixedInstance shim=pxt::getPin(PIN_SERVO_2)
    const SERVO21: PwmPin;
	*/
}


declare namespace input {
    /**
     * A button.
     */
    //% block="button A" weight=95 fixedInstance
    //% shim=pxt::getButtonByPin(PC_13,BUTTON_ACTIVE_LOW_PULL_UP)
    const buttonA: Button;

    /**
     * B button.
     */
    //% block="button B" weight=94 fixedInstance
    //% shim=pxt::getButtonByPin(PB_7,BUTTON_ACTIVE_LOW_PULL_UP)
    const buttonB: Button;
}

