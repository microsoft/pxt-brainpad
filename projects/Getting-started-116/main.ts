loops.forever(() => {
    light.pixels.showAnimation(light.animation(LightAnimation.Rainbow), 500)
})
input.onGesture(Gesture.Shake, () => {
    music.playSound(music.sounds(Sounds.PowerUp))
})
