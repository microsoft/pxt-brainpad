// Auto-generated. Do not edit.
declare namespace display {

    /**
     * Set leds .
     * @param leds .
     * @param interval.
     */
    //% shim=display::setMatrixLeds
    function setMatrixLeds(led: int32, value: boolean): void;

    /**
     * Draws an image on the LED screen.
     * @param leds the pattern of LED to turn on/off
     * @param interval time in milliseconds to pause after drawing
     */
    //% weight=95 blockGap=8
    //% imageLiteral=1 async
    //% blockId=display_show_leds
    //% block="show leds"
    //% group="Virtual Leds" interval.defl=400 shim=display::__setMatrixLeds
    function __setMatrixLeds(leds: string, interval?: int32): void;

    /**
     * Draws an image on the LED screen.
     * @param leds the pattern of LED to turn on/off
     * @param interval time in milliseconds to pause after drawing
     */
    //% weight=94 blockGap=8    
    //% blockId=display_clear_leds
    //% block="clear leds"
    //% group="Virtual Leds" shim=display::__ClearMatrixLeds
    function __ClearMatrixLeds(): void;
}

// Auto-generated. Do not edit. Really.
