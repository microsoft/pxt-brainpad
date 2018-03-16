namespace keys {
    //% fixedInstance block="left"
    export const left = new Key(1, input.buttonL.id(), DAL.DEVICE_BUTTON_EVT_UP, DAL.DEVICE_BUTTON_EVT_DOWN);
    //% fixedInstance block="up"
    export const up = new Key(2, input.buttonU.id(), DAL.DEVICE_BUTTON_EVT_UP, DAL.DEVICE_BUTTON_EVT_DOWN);
    //% fixedInstance block="right"
    export const right = new Key(3, input.buttonR.id(), DAL.DEVICE_BUTTON_EVT_UP, DAL.DEVICE_BUTTON_EVT_DOWN);
    //% fixedInstance block="down"
    export const down = new Key(4, input.buttonD.id(), DAL.DEVICE_BUTTON_EVT_UP, DAL.DEVICE_BUTTON_EVT_DOWN);
}