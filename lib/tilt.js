window.addEventListener("deviceorientation", handleOrientation, true);

function handleOrientation(event) {
    var absolute = event.absolute;
    var alpha = event.alpha;
    var beta = event.beta;
    var gamma = event.gamma;

    if (!diorama.tiltable) {
        diorama.limits.x[0] += diorama.tiltMagnitude
        diorama.limits.x[1] -= diorama.tiltMagnitude
        diorama.limits.y[0] += diorama.tiltMagnitude
        diorama.limits.y[1] -= diorama.tiltMagnitude
        diorama.tiltable = true
    }

    // document.getElementsByClassName('show-title')[0].innerText = Math.round(event.absolute) + "|" + Math.round(event.alpha) + "|" + Math.round(event.beta) + "|" + Math.round(event.gamma);

    diorama.tilt.x = Math.round(event.gamma)
    diorama.tilt.y = Math.round(event.beta)
    diorama.draw()
}
