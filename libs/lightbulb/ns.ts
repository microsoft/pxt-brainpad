
/**
 * Well known colors for the RGB Led
 */
enum Colors {
    //% block=red blockIdentity=rgb.colors
    Red = 0xFF0000,
    //% block=orange blockIdentity=rgb.colors
    Orange = 0xFFA500,
    //% block=yellow blockIdentity=rgb.colors
    Yellow = 0xFFFF00,
    //% block=green blockIdentity=rgb.colors
    Green = 0x00FF00,
    //% block=blue blockIdentity=rgb.colors
    Blue = 0x0000FF,
    //% block=indigo blockIdentity=rgb.colors
    Indigo = 0x4b0082,
    //% block=violet blockIdentity=rgb.colors
    Violet = 0x8a2be2,
    //% block=purple blockIdentity=rgb.colors
    Purple = 0xFF00FF,
    //% block=pink blockIdentity=rgb.colors
    Pink = 0xFFC0CB,
    //% block=white blockIdentity=rgb.colors
    White = 0xFFFFFF,
    //% block=black  blockIdentity=rgb.colors
    Black = 0x000000
}

//% block="Light bulb"
namespace lightbulb {

    /**
      * Get the color picker field editor
      * @param color color, eg: 0xFF0000
      */
    //% blockId=colorNumberPicker block="%color"
    //% blockHidden=true
    //% shim=TD_ID colorSecondary="#FFFFFF"
    //% color.fieldEditor="colornumber" color.fieldOptions.decompileLiterals=true
    //% color.fieldOptions.colours='["#FF0000", "#ff8000", "#ffff00", "#00ff00", "#00ffff", "#007fff", "#0000ff", "#7f00ff", "#ff0080", "#ff00ff", "#ffffff", "#999999"]'
    //% color.fieldOptions.columns=3 color.fieldOptions.className='rgbColorPicker'
    export function __colorNumberPicker(color: number): number {
        return color;
    }

    /**
      * Get the color wheel field editor
      * @param value value between 0 to 255 to get a color value, eg: 10
      */
    //% blockId=colorWheelPicker block="%color"
    //% blockHidden=true
    //% shim=TD_ID colorSecondary="#FFFFFF"
    //% color.fieldEditor="colorwheel" color.fieldOptions.decompileLiterals=true
    //% color.fieldOptions.sliderWidth='200' color.fieldOptions.channel="hsvfast"
    //% color.fieldOptions.min=0 color.fieldOptions.max=255
    export function __colorWheelPicker(color: number): number {
        return color;
    }
}