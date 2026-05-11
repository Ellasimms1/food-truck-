const menuWrapper = document.querySelector('#menuWrapper')
const eventsWrapper = document.querySelector('#eventsWrapper')

// variables for event.html
const eventName = document.querySelector('#eventName')
const eventDate = document.querySelector('#eventDate')
const eventLocation = document.querySelector('#eventLocation')
const eventTime = document.querySelector('#eventTime')

// display the menu
const getMenu = async () => {
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

menuForm.addEventListener('submit', async () => {

})

// display a single event details
(async () => {
    const { pathname } = window.location

    if(pathname.startsWith('/event/')) {
        const [, route, id] = pathname.split('/')

        const result = await fetch(`/api/v1/events/${id}`)
        const { name, date, location, time } = await result.json()

        eventName.textContent = name
        eventDate.textContent = date
        eventLocation.textContent = location
        eventTime.textContent = time
    }
})()