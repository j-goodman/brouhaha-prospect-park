function Diorama (obj) {
    this.cutouts = obj.cutouts.sort(function (x, y) {
        return x.anchor.z > y.anchor.z ? -1 : 1
    })
    this.canvas = document.getElementById(obj.canvasId)
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    this.ctx = this.canvas.getContext('2d')
    this.position = {
        x: 0,
        y: 0,
    }
    this.scale = obj.scale
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
        if (cutout.height === 'auto' && cutout.image.height !== 0) {
            cutout.height = cutout.width * (cutout.image.height / cutout.image.width)
            console.log('Setting cutout height...', cutout.height)
        } else if (cutout.width === 'auto' && cutout.image.width !== 0) {
            cutout.width = cutout.height * (cutout.image.width / cutout.image.height)
            console.log('Setting cutout width...', cutout.width)
        }

        this.ctx.drawImage(
            cutout.image,
            cutout.anchor.x + this.position.x,
            cutout.anchor.y + this.position.y - (cutout.image.height * this.scale) + canvas.height,
            cutout.image.width * this.scale,
            cutout.image.height * this.scale
        )
    })
}

Diorama.prototype.scrollToBottom = function () {
    var frames = 70
    var frame = 0
    let target = document.body.getBoundingClientRect().height - window.innerHeight + 60
    let distance = target - window.pageYOffset
    var staticIncrement = distance / frames
    let interval = window.setInterval(() => {
        let increment = staticIncrement * 2 * ((frames / 2 - Math.abs(frames / 2 - frame)) / (frames / 2))
        frame += 1
        if (frame > frames) {
            window.clearInterval(interval)
        }
        this.position.y = window.pageYOffset + increment
        this.draw()
    }, 25)
    window.addEventListener('wheel', window.clearInterval.bind(null, interval))
}

Diorama.prototype.getCutout = function (name) {
    return this.cutouts.filter(cut => {
        return cut.name === name
    })[0]
}

instantiateDiorama = () => {
    let scale = .5
    window.diorama = new Diorama ({
        canvasId: 'canvas',
        scale: scale,
        cutouts: [
            new Cutout ({
                name: 'manhattan',
                anchor: {
                    x: -1300,
                    y: 0,
                    z: 120,
                },
                imageSource: 'images/background/manhattan.png',
                width: 4500,
                height: 'auto',
            }),
            new Cutout ({
                name: 'greenwood',
                anchor: {
                    x: -760,
                    y: 0,
                    z: 90,
                },
                imageSource: 'images/background/greenwood.png',
                width: 1600,
                height: 'auto',
            }),
            new Cutout ({
                name: 'bayridge',
                anchor: {
                    x: -820,
                    y: 0,
                    z: 100,
                },
                imageSource: 'images/background/bayridge.png',
                width: 1160,
                height: 'auto',
            }),
            new Cutout ({
                name: 'brooklyn',
                anchor: {
                    x: -598,
                    y: 0,
                    z: 0,
                },
                imageSource: 'images/background/brooklyn.png',
                width: 4500,
                height: 'auto',
            }),
            new Cutout ({
                name: 'williamsburg',
                anchor: {
                    x: 480,
                    y: 0,
                    z: 60,
                },
                imageSource: 'images/background/williamsburg.png',
                width: 1100,
                height: 'auto',
            }),
            new Cutout ({
                name: 'warehouse',
                anchor: {
                    x: 2240,
                    y: 0,
                    z: 40,
                },
                imageSource: 'images/background/warehouse.png',
                width: 1300,
                height: 'auto',
            }),
            new Cutout ({
                name: 'ridgewood',
                anchor: {
                    x: 1650,
                    y: 0,
                    z: 70,
                },
                imageSource: 'images/background/ridgewood.png',
                width: 1450,
                height: 'auto',
            }),
            new Cutout ({
                name: 'boathouse',
                anchor: {
                    x: -1000,
                    y: 0,
                    z: 30,
                },
                imageSource: 'images/background/boathouse.png',
                width: 2400,
                height: 'auto',
            }),
            new Cutout ({
                name: 'tunnel',
                anchor: {
                    x: -1420,
                    y: 0,
                    z: 60,
                },
                imageSource: 'images/background/tunnel.png',
                width: 2200,
                height: 'auto',
            }),
        ],
    })

    window.diorama.scale = scale

    diorama.position.y = 0
    diorama.position.x = 0

    diorama.draw()
}

window.addEventListener("load", function(event) {
    instantiateDiorama()
});
