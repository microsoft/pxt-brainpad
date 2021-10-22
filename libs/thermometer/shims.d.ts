// Auto-generated. Do not edit.
declare namespace input {

    /**
     * Run some code when the temperature changes from hot to cold, or from cold to hot.
     * @param condition the condition, hot or cold, the event triggers on
     * @param temperature the temperature at which this event happens, eg: 15
     * @param unit the unit of the temperature
     */
    //% shim=input::onTemperatureConditionChanged
    function onTemperatureConditionChanged(condition: TemperatureCondition, temperature: int32, unit: TemperatureUnit, handler: () => void): void;

    /**
     * Get the temperature in Celsius or Fahrenheit degrees.
     */
    //% help=input/temperature
    //% blockId=device_temperature block="temperature in %unit"
    //% parts="thermometer"
    //% weight=26 shim=input::temperature
    function temperature(unit: TemperatureUnit): int32;
}

// Auto-generated. Do not edit. Really.
