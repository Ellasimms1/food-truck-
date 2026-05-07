const menuWrapper = document.querySelector('#menuWrapper')
const eventsWrapper = document.querySelector('#eventsWrapper')

// display the menu
(async () => {
    const response = await fetch('/api/v1/menu')
    const menu = await response.json()

    menu.forEach(({name, description, price, image}) => {
        const item = document.createElement("div")
        item.className = "menuItem"
        item.innerHTML = `
            <img src="${image}" alt="${name}">
            <h3>${name}</h3>
            <p>${description}</p>
            <p>${price}</p>
        `

        menuWrapper.appendChild(item)
    })
})()

// display the overview of events
(async () => {
    const response = await fetch('/api/v1/events')
    const events = await response.json()

    events.forEach(({name, date}) => {
        const item = document.createElement("div")
        item.className = "individualEvent"
        item.innerHTML = `
            <h3>${name} on ${date}</h3>
        `

        eventsDisplayed.appendChild(individualEvent)
    })
})()

// click event for each event
