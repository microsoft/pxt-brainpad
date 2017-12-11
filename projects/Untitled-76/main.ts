input.pinA6.onEvent(ButtonEvent.Up, () => {
    music.setTempo(NaN)
    music.playTone(262, music.beat(BeatFraction.Whole))
})
loops.forever(() => {
	
})
