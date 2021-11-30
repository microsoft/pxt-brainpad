enum PingUnit {
    //% block="μs"
    MicroSeconds,
    //% block="cm"
    Centimeters,
    //% block="inches"
    Inches
}

/**
 * Sonar and ping utilities
 */
//% color="#311557" weight=95  icon="\uf09e"
namespace sonar {
    /**
     * Send a ping and get the echo time (in microseconds) as a result
     * @param trig tigger pin
     * @param echo echo pin
     * @param unit desired conversion unit
     * @param maxCmDistance maximum distance in centimeters (default is 500)
     */
    //% blockId=sonar_ping block="ping trig %trig|echo %echo|unit %unit"
    export function ping(trig: DigitalPin, echo: DigitalPin, unit: PingUnit, maxCmDistance = 500): number {
        let d: number = 0;
		
		for (let i = 0; i < 5; i++) {
			// send pulse
			trig.setPull(PinPullMode.PullNone);
			trig.digitalWrite(false);
			control.waitMicros(2);
			trig.digitalWrite(true);
			control.waitMicros(10);
			trig.digitalWrite(false);

			// read pulse
			d = echo.pulseIn(PulseValue.High, maxCmDistance * 58);
			
			if (d == 0) {
				control.waitMicros(1000);
				
				continue;
			}
			else {
				break;
			}

			
		}
		
		switch (unit) {
				case PingUnit.Centimeters: return Math.idiv(d, 58);
				case PingUnit.Inches: return Math.idiv(d, 148);
				default: return d ;
			}
    }
}
