
const router = require("express").Router()
const { getCollection, ObjectId } = require("../../../dbconnect")


//const events =[
   // {id:1, name: "Food Truck Festival", date: "2026-09-15", location: "Downtown", time: "12:00 PM"},
   // {id:2, name: "Night Market", date: "2026-09-22", location: "City Park", time: "5:00 PM"},
   // {id:3, name: "BBQ Cook-off", date: "2026-09-29", location: "Riverside", time: "1:00 PM"},
   // {id:4, name: "Street Food Fair", date: "2026-10-05", location: "Main Square", time: "11:00 AM"},
    //{id:5, name: "Food Truck Rally", date: "2026-10-12", location: "Beachfront", time: "3:00 PM"}
//]



router.get("/", async (req, res) => {
    const collection = await getCollection("FoodtruckAPI", "events")
    const found = await collection.find({}).toArray()

    res.send(found)
})

router.get("/:id", async (req, res) => {
    const { id } = req.params

    const collection = await getCollection("FoodtruckAPI", "events")

    const found = await collection.findOne({ _id: new ObjectId(id) })
    if(found) res.send(found)
    else res.send({ error: { message: "Event not found" } })
})

router.post("/", async (req, res) => {
    const { name, date, location, time } = req.body
    const collection = await getCollection("FoodtruckAPI", "events")

    const { acknowledged, insertedId } = await collection.insertOne({name,date,location,time})

    res.send({ acknowledged, insertedId })
})

module.exports = router

 
