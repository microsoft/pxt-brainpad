namespace input {
	let activeAccel: boolean = false
	
	/**
    * Turns on or off the led
    */
	//% blockId=accel_set block="set accel to %on=toggleOnOff"
    //% weight=89
	//% blockGap=8
	// BlockHidden = true
	export function setAccel(on: boolean) {		
		setActive(on);    
		activeAccel = on
    }
	
	forever(function () {
		setActive(true)
		pause(1000)
	})

     
    
}