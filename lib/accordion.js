setupAccordion = () => {
    let items = Array.from(document.getElementsByClassName('accordion-item'))
    items.map((item, index) => {
        item.childNodes[1].childNodes[3].childNodes[1].addEventListener('click', evt => {
            items.map(item => {
                item.classList.remove('open')
                item.classList.add('closed')
            })
            evt.target.parentElement.parentElement.parentElement.classList.toggle('open')
            evt.target.parentElement.parentElement.parentElement.classList.toggle('closed')
        })
    })
    window.accordionIndex = 0
    let nextButtons = Array.from(document.getElementsByClassName('next-accordion'))
    nextButtons.map(button => {
        button.addEventListener('click', evt => {
            window.accordionIndex += 1
            if (window.accordionIndex >= items.length) {
                window.accordionIndex = 0
            }
            items.map((item, index) => {
                if (index === window.accordionIndex) {
                    item.classList.add('open')
                    item.classList.remove('closed')
                } else {
                    item.classList.add('closed')
                    item.classList.remove('open')
                }
            })
        })
    })
}

window.addEventListener('load', setupAccordion)
