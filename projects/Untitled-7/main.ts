control.forever(() => {
    neopixel.builtin.drawAnimationFrame(
        NeoPixelAnimationType.RainbowCycle,
        0
    )
})
