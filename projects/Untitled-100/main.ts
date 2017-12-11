
loops.forever(() => {
    light.pixels.showAnimation(LightAnimation.Rainbow, 500)
})

input.buttonA.onEvent(ButtonEvent.Click, () => {
    music.setTempo(200)
    music.playMelody([
        'A#7:1', 'A:1',
        'A#7:1', 'A:1',
        'A#7:2'
        //'E4:1', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B',
        //'B5:1', 'A#', 'A', 'G', 'F#', 'E'
    ])
})

input.buttonB.onEvent(ButtonEvent.Click, () => {
    music.setTempo(200)
    music.playMelody([
        //'A#5:1', 'A:1',
        //'A#5:1', 'A:1',
        //'A#5:2'
        'E7:1', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'
        //'B5:1', 'A#', 'A', 'G', 'F#', 'E'
    ])
    /*
    for (let i = 50; i < 15000; i++) {
        music.playTone(i, 50);
        loops.pause(10);
    }*/
})

function playTone(frequencyInHertz: number, timeInMilliseconds: number) {
    let delayAmount = (1000000 / frequencyInHertz);
    let loopTime = ((timeInMilliseconds * 1000) / (delayAmount * 2));
    for (let x = 0; x < loopTime; x++) {
        pins.A0.digitalWrite(true);
        loops.pause(delayAmount);
        pins.A0.digitalWrite(false);
        loops.pause(delayAmount);
    }
}

input.onGesture(Gesture.Shake, () => {
    music.setTempo(200)
    music.playMelody([
        //'A#5:1', 'A:1',
        //'A#5:1', 'A:1',
        //'A#5:2'
        //'E4:1', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'
        'A7#:1', 'A', 'G#', 'G', 'F#', 'F', 'E'
    ])
    light.pixels.showAnimation(LightAnimation.Sparkle, 1000)

})