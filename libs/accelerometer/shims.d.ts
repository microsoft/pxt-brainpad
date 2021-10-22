// Auto-generated. Do not edit.
declare namespace input {

    /**
     * Do something when when a gesture is done (like shaking the board).
     * @param gesture the type of gesture to track, eg: Gesture.Shake
     * @param body code to run when gesture is raised
     */
    //% help=input/on-gesture
    //% blockId=device_gesture_event block="on |%NAME"
    //% parts="accelerometer"
    //% gesture.fieldEditor="gridpicker"
    //% gesture.fieldOptions.width=220
    //% gesture.fieldOptions.columns=3
    //% weight=98 blockGap=12 shim=input::onGesture
    function onGesture(gesture: Gesture, body: () => void): void;

    /**
     * Get the acceleration value in milli-gravitys (when the board is laying flat with the screen up,
     * x=0, y=0 and z=-1023)
     * @param dimension TODO
     */
    //% help=input/acceleration
    //% blockId=device_acceleration block="acceleration (mg)|%NAME"
    //% parts="accelerometer"
    //% dimension.fieldEditor="gridpicker"
    //% dimension.fieldOptions.width=180
    //% dimension.fieldOptions.columns=2
    //% weight=42 blockGap=8 shim=input::acceleration
    function acceleration(dimension: Dimension): int32;

    /**
     * The pitch or roll of the device, rotation along the ``x-axis`` or ``y-axis``, in degrees.
     * @param kind TODO
     */
    //% shim=input::rotation
    function rotation(kind: Rotation): int32;

    /**
     * Sets the accelerometer sample range in gravities.
     * @param range a value describe the maximum strengh of acceleration measured
     */
    //% shim=input::setAccelerometerRange
    function setAccelerometerRange(range: AcceleratorRange): void;
}

// Auto-generated. Do not edit. Really.
