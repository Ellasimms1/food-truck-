const menuWrapper = document.querySelector('#menuWrapper')
const eventsWrapper = document.querySelector('#eventsWrapper')

// variables for event.html
const eventName = document.querySelector('#eventName')
const eventDate = document.querySelector('#eventDate')
const eventLocation = document.querySelector('#eventLocation')
const eventTime = document.querySelector('#eventTime')

// display the menu
const getMenu = async () => {
    menuWrapper.innerHTML = ''

    const response = await fetch('/api/v1/menu')
    const menu = await response.json()

    menu.forEach(({ name, description, price, imagePath }) => {
        const item = document.createElement("div")
        item.className = "menuItem"
        item.innerHTML = `
            <img src="${ imagePath }" alt="${ name }">
            <h3>${ name }</h3>
            <p>${ description }</p>
            <p>$${ price }</p>
        `

        menuWrapper.appendChild(item)
    })
}

// display the overview of events
const eventOverview = async () => {
    eventsWrapper.innerHTML = ''

    const response = await fetch('/api/v1/events')
    const events = await response.json()

    events.forEach(({ _id, name, date }) => {
        const item = document.createElement("div")
        item.className = "individualEvent"
        item.innerHTML = `
            <h3>${ name } on ${ date }</h3>
        `
        
        // click event
        item.addEventListener('click', async () => window.location.href = `/event/${_id}`)

        eventsWrapper.appendChild(item)
    })
}

(async () => {
    if (menuWrapper) await getMenu() 

    if (eventsWrapper) await eventOverview()
})()

// routes for admin
const menuForm = document.querySelector('#menuForm')
const menuButton = document.querySelector('#menuButton')
const eventForm = document.querySelector('#eventForm')
const eventButton = document.querySelector('#eventButton')

if (menuButton) {
    menuButton.addEventListener('click', async () => {
        const name = document.querySelector('#menuName').value
        const description = document.querySelector('#menuDescription').value
        const price = document.querySelector('#menuPrice').value
        const imagePath = document.querySelector('#menuImageURL').value

        const response = await fetch('/api/v1/menu', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name,
                description,
                price,
                imagePath
            })
        })

        const result = await response.json()
        alert("Menu item added!")

        // resets values
        menuForm.reset()
    }) 
}

if (eventButton) {
    eventButton.addEventListener('click', async () => {
        const name = document.querySelector('#eventName').value
        const date = document.querySelector('#eventDate').value
        const location = document.querySelector('#eventLocation').value
        const time = document.querySelector('#eventTime').value

        const response = await fetch('/api/v1/events', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name,
                date,
                location,
                time
            })
        })

        const result = await response.json()
        alert("Event added!")
        
        // resets values 
        eventForm.reset()
    })
}


// display a single event details on event.html
const displaySingleEvent = async () => {
    const { pathname } = window.location

    const [, searchType, id] = pathname.split('/')

   if (searchType !== 'event') return

    const result = await fetch(`/api/v1/events/${id}`)
    const { name, date, location, time } = await result.json()

    eventName.textContent = name
    eventDate.textContent = date
    eventLocation.textContent = location
    eventTime.textContent = time
}

displaySingleEvent()