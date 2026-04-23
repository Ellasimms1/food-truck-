
const router = require ('express').Router()


const events =[
    {id:1, name: "Food Truck Festival", date: "2026-09-15", location: "Downtown", time: "12:00 PM"},
    {id:2, name: "Night Market", date: "2026-09-22", location: "City Park", time: "5:00 PM"},
    {id:3, name: "BBQ Cook-off", date: "2026-09-29", location: "Riverside", time: "1:00 PM"},
    {id:4, name: "Street Food Fair", date: "2026-10-05", location: "Main Square", time: "11:00 AM"},
    {id:5, name: "Food Truck Rally", date: "2026-10-12", location: "Beachfront", time: "3:00 PM"}
]

router.get('/', (req, res) => {
    res.json(events)
})

router.get('/:id', (req, res) => {
    const {id} =req.params
    const found =events.find(item => item.id.toString() === id)
    if (found) {
        res.json(found)
    } else {
        res.status(404).json({ message: "Event not found" })
    }
})

router.post ('/', (req, res) => {
    const {name, date, location, time} = req.body
    const newEvent = {
        id: events.length + 1,
        name,
        date,
        location,
        time
    }
    events.push(newEvent)
    res.status(201).json(newEvent)
})
module.exports = router