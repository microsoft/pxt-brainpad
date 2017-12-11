music.setVolume(10)
loops.forever(() => {
    light.pixels.showAnimation(LightAnimation.Rainbow, 500)
})
input.onGesture(Gesture.Shake, () => {
    music.playSound('g7:1-300 a b c8 d e f# e d c:6')
    light.pixels.showAnimation(LightAnimation.Sparkle, 1500)
})