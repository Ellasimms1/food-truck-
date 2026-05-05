(async () => {
    const menuList = document.querySelector('.menuList')
    const response = await fetch('/api/v1/menu')
    const menu = await response.json()

    menuList.innerHTML = 
})()

(async () => {
    const eventsOverview = document.querySelector('.eventsOverview')

    const response = await fetch('/api/v1/events')
    const events = await response.json()

    events.innerHTML = 
})()