loops.forever(() => {
    light.pixels.setAll(Colors.Yellow)
})
loops.forever(() => {
    light.pixels.setBrightness(input.soundLevel())
})
