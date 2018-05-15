function smoothMove (start, end, frames, frameRate, act) {
    let frame = 0
    let totalIncrement = start
    let distance = end - start
    let staticIncrement = distance / frames
    let interval = window.setInterval(function () {
        let increment = staticIncrement * 2 * (
            (frames / 2 - Math.abs(frames / 2 - frame)) / (frames / 2)
        )
        if (frame++ > frames) {
            window.clearInterval(interval)
        }
        totalIncrement += increment
        act(totalIncrement)
    }, frameRate)
}
