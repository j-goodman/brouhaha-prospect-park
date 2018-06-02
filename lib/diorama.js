function Diorama (obj) {
    this.cutouts = obj.cutouts.sort(function (x, y) {
        return x.anchor.z > y.anchor.z ? -1 : 1
    })
    this.canvas = document.getElementById(obj.canvasId)
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    this.ctx = this.canvas.getContext('2d')
    this.scale = obj.scale
    this.limits = {
        x: [-598 + (4877 * .65) * this.scale - window.innerWidth - 50, -1700],
        y: [0, -2000],
        z: [160, 0],
    }
    this.position = {
        x: this.limits.x[1],
        y: this.limits.y[1],
    }
    this.screenIndex = 0
    this.tiltable = false
    this.tiltMagnitude = 400
    this.tiltLimits = {
        x: [-30, 30],
        y: [-10, 90]
    }
    this.tilt = {
        x: 0,
        y: 0
    }
}

function Cutout (obj) {
    this.anchor = obj.anchor
    this.name = obj.name
    this.image = document.createElement('img')
    this.image.src = obj.imageSource
    this.image.onload = function () {
        diorama.draw()
    }.bind(this)
    this.width = obj.width
    this.height = obj.height
}

Diorama.prototype.draw = function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.cutouts.map(cutout => {
        this.ctx.drawImage(
            cutout.image,
            (cutout.anchor.x - this.position.x) * ((this.limits.z[0] - cutout.anchor.z) / this.limits.z[0]),
            (cutout.anchor.y - this.position.y * (this.limits.z[0] - cutout.anchor.z) / this.limits.z[0]) - (cutout.image.height * this.scale) + canvas.height,
            (cutout.image.width * this.scale),
            (cutout.image.height * this.scale)
        )
    })
}

instantiateDiorama = () => {
    let scale = 1
    window.diorama = new Diorama ({
        canvasId: 'canvas',
        scale: scale,
        cutouts: [
            new Cutout ({
                name: 'manhattan',
                anchor: {
                    x: -4000,
                    y: 100,
                    z: 130,
                },
                imageSource: 'images/background/manhattan.png',
            }),
            new Cutout ({
                name: 'greenwood',
                anchor: {
                    x: -1300,
                    y: -224,
                    z: 90,
                },
                imageSource: 'images/background/greenwood.png',
            }),
            new Cutout ({
                name: 'bayridge',
                anchor: {
                    x: -1800,
                    y: -150,
                    z: 100,
                },
                imageSource: 'images/background/bayridge.png',
            }),
            new Cutout ({
                name: 'brooklyn',
                anchor: {
                    x: -598,
                    y: 0,
                    z: 0,
                },
                imageSource: 'images/background/brooklyn.png',
            }),
            new Cutout ({
                name: 'williamsburg',
                anchor: {
                    x: 420,
                    y: -150,
                    z: 70,
                },
                imageSource: 'images/background/williamsburg.png',
            }),
            new Cutout ({
                name: 'warehouse',
                anchor: {
                    x: 1900,
                    y: 84,
                    z: 40,
                },
                imageSource: 'images/background/warehouse.png',
            }),
            new Cutout ({
                name: 'ridgewood',
                anchor: {
                    x: 1740,
                    y: -50,
                    z: 80,
                },
                imageSource: 'images/background/ridgewood.png',
            }),
            new Cutout ({
                name: 'boathouse',
                anchor: {
                    x: -1700,
                    y: 0,
                    z: 30,
                },
                imageSource: 'images/background/boathouse.png',
            }),
            new Cutout ({
                name: 'tunnel',
                anchor: {
                    x: -2060,
                    y: -60,
                    z: 60,
                },
                imageSource: 'images/background/tunnel.png',
            }),
        ],
    })

    window.addEventListener('resize', () => {
        // Resize event.
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
        diorama.limits = {
            x: [-598 + (4877 * .65) * diorama.scale - window.innerWidth - 50, -1700],
            y: [0, -2000],
            z: [160, 0],
        }
        diorama.draw()
    })

    window.diorama.scale = scale

    diorama.draw()
}

window.addEventListener('load', function(event) {
    instantiateDiorama()

    let easeDown = () => {
        if (Math.round(diorama.position.x / 50) !== Math.round(diorama.limits.x[1] / 50)) {
            return false
        }
        document.getElementsByClassName('enter-content')[0].classList.add('invisible')
        setTimeout(() => {
            document.getElementsByClassName('enter-content')[0].classList.add('hidden')
            document.getElementsByClassName('main-content')[0].classList.remove('hidden')
            setTimeout(() => {
                document.getElementsByClassName('main-content')[0].classList.remove('invisible')
            }, 20)
        }, 2150)
        smoothMove(diorama.position.y, 0, 100, 20, x => {
            diorama.position.y = x
            diorama.draw()
        })
    }

    let easeUp = () => {
        if (diorama.screenIndex !== 0) {
            return false
        }
        document.getElementsByClassName('main-content')[0].classList.add('invisible')
        setTimeout(() => {
            document.getElementsByClassName('main-content')[0].classList.add('hidden')
            document.getElementsByClassName('enter-content')[0].classList.remove('hidden')
            setTimeout(() => {
                document.getElementsByClassName('enter-content')[0].classList.remove('invisible')
            }, 20)
        }, 2150)
        smoothMove(diorama.position.y, diorama.limits.y[1], 100, 20, x => {
            diorama.position.y = x
            diorama.draw()
        })
    }

    document.getElementsByClassName('enter-arrow')[0].addEventListener('click', easeDown)
    document.getElementById('brouhaha-image').addEventListener('click', () => {
        window.location = 'http://www.brouhahatheatreproject.org'
    })
    window.swipeUp = easeDown
    window.swipeDown = easeUp

    window.swipeLeft = () => {
        evaluateSwipe(1)
    }

    window.swipeRight = () => {
        evaluateSwipe(-1)
    }

    let evaluateSwipe = direction => {
        if (diorama.position.y > -1000) {
            let previousIndex = diorama.screenIndex
            diorama.screenIndex += direction
            diorama.screenIndex = diorama.screenIndex >= 0 ? diorama.screenIndex : 0
            diorama.screenIndex = diorama.screenIndex <= 2 ? diorama.screenIndex : 2
            if (diorama.screenIndex !== previousIndex) {
                if (diorama.screenIndex === 0) {
                    slideToMain()
                } else if (diorama.screenIndex === 1) {
                    slideToMore()
                } else if (diorama.screenIndex === 2) {
                    slideToBios()
                }
            }
        }
    }

    let slideToBios = () => {
        diorama.screenIndex = 2
        document.getElementsByClassName('main-content')[0].classList.add('invisible')
        document.getElementsByClassName('middle-content')[0].classList.add('invisible')
        setTimeout(() => {
            document.getElementsByClassName('main-content')[0].classList.add('hidden')
            document.getElementsByClassName('middle-content')[0].classList.add('hidden')
            document.getElementsByClassName('side-content')[0].classList.remove('hidden')
            setTimeout(() => {
                document.getElementsByClassName('side-content')[0].classList.remove('invisible')
            }, 20)
        }, 2150)
        smoothMove(diorama.position.x, diorama.limits.x[0], 134, 20, x => {
            diorama.position.x = x
            diorama.draw()
        })
    }

    Array.from(document.getElementsByClassName('go-to-bios')).map(element => {
        element.addEventListener('click', slideToBios)
    })

    let slideToMore = () => {
        diorama.screenIndex = 1
        document.getElementsByClassName('main-content')[0].classList.add('invisible')
        setTimeout(() => {
            document.getElementsByClassName('main-content')[0].classList.add('hidden')
            document.getElementsByClassName('middle-content')[0].classList.remove('hidden')
            setTimeout(() => {
                document.getElementsByClassName('middle-content')[0].classList.remove('invisible')
            }, 20)
        }, 2150)
        smoothMove(diorama.position.x, 0, 134, 20, x => {
            diorama.position.x = x
            diorama.draw()
        })
    }

    document.getElementsByClassName('go-to-more')[0].addEventListener('click', slideToMore)

    let slideToMain = () => {
        diorama.screenIndex = 0
        document.getElementsByClassName('side-content')[0].classList.add('invisible')
        document.getElementsByClassName('middle-content')[0].classList.add('invisible')
        setTimeout(() => {
            document.getElementsByClassName('side-content')[0].classList.add('hidden')
            document.getElementsByClassName('middle-content')[0].classList.add('hidden')
            document.getElementsByClassName('main-content')[0].classList.remove('hidden')
            setTimeout(() => {
                document.getElementsByClassName('main-content')[0].classList.remove('invisible')
            }, 20)
        }, 2150)
        smoothMove(diorama.position.x, diorama.limits.x[1], 134, 20, x => {
            diorama.position.x = x
            diorama.draw()
        })
    }

    Array.from(document.getElementsByClassName('go-to-main')).map(el => {
        el.addEventListener('click', slideToMain)
    })
});
