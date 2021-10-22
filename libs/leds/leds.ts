//% color=#1E90FF weight=116 icon="\uf00a"
namespace leds {
	const MATRIX_LED_NUM = 25;
	/**
     * TODO: describe your function here
     */
	//* blockId=led_set_matrix 
    //% block="Set leds"
    //% imageLiteral=1
    //% imageLiteralColumns=12
    //% imageLiteralRows=3
	//% async
    export function __setMatrixLeds(leds: string, interval:number = 400): void {		
		let ledMatrix: string = "";
		
		// for (let i = 0; i < 50; i++) {
			// console.logValue("c", leds.charCodeAt(i));
		// }
		
		for (let i = 5; i < leds.length; i++) {
			let ch = leds.charAt(i);
			
			if (ch == '.') {
				ledMatrix += ch;
				
			}
			else if (ch == '#') {
				ledMatrix += ch;
				
			}

		}	
		
		let ledWidth =  (screen.height / 5) | 0;
		let ledHeight = (screen.height / 5) | 0;
		
		
		screen.fill(0);
		
		for (let led = 0; led < ledMatrix.length; led++) {
			let xSrc = (led % 5) | 0;
			let ySrc = (led / 5) | 0;
			
			let xDest = xSrc * ledWidth;
			let yDest = ySrc * ledHeight;
			
			if (ledMatrix.charAt(led) == '#'){
				screen.fillRect(xDest + 34 + 1, yDest+1, ledWidth-1, ledHeight-1, 1);				
				setMatrixLeds(led, true);
			}	
			else {	
				setMatrixLeds(led, false);				
			}
		}
		
		// force to update
		control.__screen.update();					
    }
	
	/**
     * TODO: describe your function here
     */
	//* blockId=led_clear_matrix 
    //% block="Clear leds"    
    export function __ClearMatrixLeds(): void {
		screen.fill(0);
		
		for (let led = 0; led < MATRIX_LED_NUM; led++) {
			setMatrixLeds(led, false);	
		}
	}

	
}
