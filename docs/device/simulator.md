# @extends

## #example

```sim
let temp = input.temperature(TemperatureUnit.Celsius);
let level = input.lightLevel();
let accel = input.acceleration(Dimension.Y);

input.buttonB.onEvent(ButtonEvent.Click, function () {
    for (let k = 0; k < 2; k++) {
        light.setAll(Colors.Green);
        loops.pause(200);
        light.setAll(Colors.Black);
        loops.pause(200);
    }
})
```