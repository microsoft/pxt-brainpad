
/**
 * Outputs.
 */
//% color="#00FF00" weight=96 icon="\uf205"
namespace led {	
	let led_state: boolean = false
	/**
    * Turns on or off the led
    */
	//% blockId=led_set block="set led to %on=toggleOnOff"
    //% weight=89
	//% blockGap=8
	export function setled(on: boolean) {		
		__setLed(on);    
		led_state = on
    }
	
    	
	/**
    * Toggle the led
    */
	//% blockId=led_toggle block="led toggle"
    //% weight=89
    export function toggle() {		
		led_state = !led_state
		__setLed(led_state)
		
    }

    function update() {
        
    }              
    
}