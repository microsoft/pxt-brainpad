namespace controller {
    //% fixedInstance block="left"
    export const left = new Button(1, config.PIN_BTN_LEFT, DAL.DEVICE_BUTTON_EVT_UP, DAL.DEVICE_BUTTON_EVT_DOWN)
    //% fixedInstance block="up"
    export const up = new Button(2, config.PIN_BTN_UP, DAL.DEVICE_BUTTON_EVT_UP, DAL.DEVICE_BUTTON_EVT_DOWN)
    //% fixedInstance block="right"
    export const right = new Button(3, config.PIN_BTN_RIGHT, DAL.DEVICE_BUTTON_EVT_UP, DAL.DEVICE_BUTTON_EVT_DOWN)
    //% fixedInstance block="down"
    export const down = new Button(4, config.PIN_BTN_DOWN, DAL.DEVICE_BUTTON_EVT_UP, DAL.DEVICE_BUTTON_EVT_DOWN)
}