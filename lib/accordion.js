setupAccordion = () => {
    let items = Array.from(document.getElementsByClassName('accordion-item'))
    items.map(item => {
        item.childNodes[1].childNodes[3].childNodes[1].addEventListener('click', evt => {
            items.map(item => {
                item.classList.remove('open')
                item.classList.add('closed')
            })
            evt.target.parentElement.parentElement.parentElement.classList.toggle('open')
            evt.target.parentElement.parentElement.parentElement.classList.toggle('closed')
        })
    })
    let nextButtons = Array.from(document.getElementsByClassName('next-accordion'))
    nextButtons.map(button => {
        button.addEventListener('click', evt => {
            let nextToOpen = false
            items.map(item => {
                if (nextToOpen) {
                    setTimeout(() => {
                        item.classList.add('open')
                        item.classList.remove('closed')
                    }, 300)
                } else {
                    item.classList.add('closed')
                    item.classList.remove('open')
                }
                nextToOpen = false
                if (item.childNodes[3].childNodes[3] === evt.target) {
                    nextToOpen = true
                }
            })
        })
    })
    let tops = Array.from(document.getElementsByClassName('top-half'))
    tops.map(top => {
        window.im = top.childNodes[1]
        console.log(window.im)
    })
}

window.addEventListener('load', setupAccordion)
