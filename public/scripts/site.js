const menuWrapper = document.querySelector('#menuWrapper')
const eventsWrapper = document.querySelector('#eventsWrapper')
const eventDetails = document.querySelector('#eventDetails')

// display the menu
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

// display the overview of events
(async () => {
    const response = await fetch('/api/v1/events')
    const events = await response.json()

    events.forEach(({_id, name, date, location, time}) => {
        const item = document.createElement("div")
        item.className = "individualEvent"
        item.innerHTML = `
            <h3>${name} on ${date}</h3>
        `
        
        // click event
        item.addEventListener('click', async () => {
            try{
            const response = await fetch(`/api/v1/events/${_id}`)
            const found = await response.json()

            eventDetails.innerHTML = `
                <h2>${name}</h2>
                <p><strong>Date:</strong> ${date}</p>
                <p><strong>Location:</strong> ${location}</p>
                <p><strong>Time:</strong> ${time}</p>
            `} catch (error) {
                console.error('Error:', error)
            }
        })

        eventsWrapper.appendChild(item)
    })
})()

// click event for each event
