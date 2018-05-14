# @extends

## #example

```sim
input.buttonL.onEvent(ButtonEvent.Click, function () {
    lightbulb.setColor(0xffff00)
})
input.buttonR.onEvent(ButtonEvent.Click, function () {
    for (let i = 0; i < 2; i++) {
        lightbulb.setColor(0x00ff00)
        loops.pause(200)
        lightbulb.setColor(0x000000)
        loops.pause(200)
    }
})
```