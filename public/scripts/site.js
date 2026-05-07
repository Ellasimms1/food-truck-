const menuWrapper = document.querySelector('#menuWrapper')
const eventsWrapper = document.querySelector('#eventsWrapper')

// display the menu
try{
    (async () => {
    const response = await fetch('/api/v1/menu')
    const menu = await response.json()

    menu.forEach(({name, description, price, imagePath}) => {
        const item = document.createElement("div")
        item.className = "menuItem"
        item.innerHTML = `
            <img src="${imagePath}" alt="${name}">
            <h3>${name}</h3>
            <p>${description}</p>
            <p>${price}</p>
        `

        menuWrapper.appendChild(item)
    })
})()
} catch (error)
{
    console.log(error)
}


// display the overview of events
(async () => {
    const response = await fetch('/api/v1/events')
    const events = await response.json()

    events.forEach(({_id, name, date}) => {
        const item = document.createElement("div")
        item.className = "individualEvent"
        item.innerHTML = `
            <h3>${name} on ${date}</h3>
        `
        
        // click event
        item.addEventListener('click', async () => {
            const response = await fetch(`/api/v1/events/${_id}`)
            const found = await response.json()
        })

        eventsWrapper.appendChild(item)
    })
})()

// click event for each event
