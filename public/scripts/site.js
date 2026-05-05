const eventsDisplayed = document.querySelector('.eventsDisplayed')

// const getMenu = async () => {
//     const menuList = document.querySelector('.menuList')
//     const response = await fetch('/api/v1/menu')
//     const menu = await response.json()

//     menuList.innerHTML = 
// }

const eventOverview = async () => {
    const response = await fetch(`/api/v1/events`)
    return await response.json()
}


const showEvent = events => {
    events?.forEach(({name, date}) => {
        const individualEvent = document.createElement("div")
        individualEvent.className = "individual-Event"
        individualEvent.innerHTML = `
            <h3>${name} on ${date}</h3>
        `

        eventsDisplayed.appendChild(individualEvent)
    })
}

(async () => {
    const response = await fetch(`/api/v1/events`)
    const { name, date } = await response.json()
})()


//     const response = await fetch('/api/v1/events')
//     const events = await response.json()

//     events.innerHTML = 
// })()

