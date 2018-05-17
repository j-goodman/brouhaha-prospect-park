window.addEventListener("deviceorientation", handleOrientation, true);

function handleOrientation(event) {
    var absolute = event.absolute;
    var alpha = event.alpha;
    var beta = event.beta;
    var gamma = event.gamma;

    diorama.tiltable = true

    document.getElementsByClassName('show-title')[0].innerText = 'BINNENWATER 3';
    document.getElementsByClassName('show-title')[0].innerText = Math.round(event.absolute) + "|" + Math.round(event.alpha) + "|" + Math.round(event.beta) + "|" + Math.round(event.gamma);

    diorama.tilt.x = Math.round(event.gamma)
    diorama.tilt.y = Math.round(event.beta)
    diorama.draw()
}
