loops.forever(() => {
    light.showRing(
        `red red red red red red red red red red`
    )
    loops.pause(500)
    light.showRing(
        `black black black black black black black black black black`
    )
    loops.pause(500)
})