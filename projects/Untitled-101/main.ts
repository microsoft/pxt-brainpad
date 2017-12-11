loops.forever(() => {
    light.showRing(
    `red red red red red red red red red red`
    )
    music.setSpeakerVolume(4)
    music.setOutput(SoundOutputDestination.Pin)
    music.playTone(262, music.beat(BeatFraction.Half))
})
