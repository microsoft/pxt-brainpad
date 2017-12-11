loops.forever(() => {
    light.showRing(
    `red red red red red red red red red red`
    )
    music.playTone(262, music.beat(BeatFraction.Half))
    light.showRing(
    `red red red red red red red red red red`
    )
    music.playTone(587, music.beat(BeatFraction.Half))
})
