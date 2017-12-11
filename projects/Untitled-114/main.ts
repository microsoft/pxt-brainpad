loops.forever(() => {
    light.pixels.setAll(Colors.Yellow)
})
input.buttonB.onEvent(ButtonEvent.Click, () => {
    light.pixels.setBrightness(255)
})
loops.forever(() => {
	
})
input.buttonA.onEvent(ButtonEvent.Click, () => {
    light.pixels.setBrightness(101)
})
