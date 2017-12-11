loops.forever(() => {

})
input.buttonA.onEvent(ButtonEvent.Click, () => {
    music.setOutput(SoundOutputDestination.Pin)
    music.playSound(music.sounds(Sounds.PowerUp))
})
