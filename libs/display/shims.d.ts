// Auto-generated. Do not edit.



    //% color="#0078d7" weight=97 icon="\uf1ec"
declare namespace display {

    /**
     * Init Display.
     */
    //% blockId=display_init block="DisplayInit"
    //% weight=26 shim=display::DisplayInit
    function DisplayInit(): void;

    /**
     * Init Display.
     */
    //% blockId=display_write_buffer block="Draw Buffer"
    //% weight=26 shim=display::WriteScreenBuffer
    function WriteScreenBuffer(): void;

    /**
     * Set Pixel.
     */
    //% blockId=display_set_pixel block="set pixel at x %x| y %y"
    //% weight=26 shim=display::SetPixel
    function SetPixel(x: int32, y: int32): void;

    /**
     * Draw circle.
     */
    //% blockId=display_draw_circle block="draw circle at x %x| y %y| r %r"
    //% weight=26 shim=display::DrawCircle
    function DrawCircle(x0: int32, y0: int32, radius: int32): void;

    /**
     * Draw rectangle.
     */
    //% blockId=display_draw_rectangle block="draw rectangle at x %x| y %y| width %width| height %height"
    //% weight=26 shim=display::DrawRectangle
    function DrawRectangle(x: int32, y: int32, width: int32, height: int32): void;
}

// Auto-generated. Do not edit. Really.
