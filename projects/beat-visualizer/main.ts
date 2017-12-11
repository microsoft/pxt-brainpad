let item = 0
input.pinA1.onEvent(ButtonEvent.Down, () => {
    music.playTone(262, music.beat(BeatFraction.Half))
    light.pixels.setAll(Colors.Red)
})
input.pinA2.onEvent(ButtonEvent.Down, () => {
    music.playTone(294, music.beat(BeatFraction.Half))
    light.pixels.setAll(Colors.Orange)
})
input.pinA3.onEvent(ButtonEvent.Down, () => {
    music.playTone(330, music.beat(BeatFraction.Half))
    light.pixels.setAll(Colors.Yellow)
})
input.pinA4.onEvent(ButtonEvent.Down, () => {
    music.playTone(349, music.beat(BeatFraction.Half))
    light.pixels.setAll(Colors.Green)
})
input.pinA5.onEvent(ButtonEvent.Down, () => {
    music.playTone(392, music.beat(BeatFraction.Half))
    light.pixels.setAll(Colors.Blue)
})
input.pinA6.onEvent(ButtonEvent.Down, () => {
    music.playTone(440, music.beat(BeatFraction.Half))
    light.pixels.setAll(Colors.Violet)
})
input.pinA7.onEvent(ButtonEvent.Down, () => {
    music.playTone(494, music.beat(BeatFraction.Half))
    light.pixels.setAll(Colors.Purple)
})
music.setVolume(217)
