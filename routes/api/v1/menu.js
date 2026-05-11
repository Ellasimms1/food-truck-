
const router = require("express").Router()
const { getCollection, ObjectId } = require("../../../dbconnect")

//const menu = [
   // {id:1, name: "pizza", description: "Cheesy goodness ", price: 9.99, image: "/images/pizza.jpg"},
    //{id:2, name: "burger", description: "Juicy beef patty", price: 11.99, image: "/images/hamburger.jpg"},
   // {id:3, name: "taco", description: "Spicy chicken wrap", price: 8.99, image: "/images/taco.jpg"},
   // {id:4, name: "hotdog", description: "Grilled sausage in a bun", price: 4.99, image: "/images/hotdog.jpg"},
    //{id:5, name: "fries", description: "Crispy golden loaded fries", price: 3.99, image: "/images/fries.jpg"}
//]



router.get("/", async (req, res) => {
    const collection = await getCollection("FoodtruckAPI", "MenuItems")
    const found = await collection.find({}).toArray()

    res.send(found)
})

router.get("/:id", async (req, res) => {
    const { id } = req.params

    const collection = await getCollection("FoodtruckAPI", "MenuItems")

    const found = await collection.findOne({ _id: new ObjectId(id)})
    if(found) res.send(found)
    else res.send({ error: { message: "Menu item not found" } })
})

router.post("/", async (req, res) => {
    const {name, description, price, imagePath} = req.body
    const collection = await getCollection("FoodtruckAPI", "MenuItems")

    const {acknowledged, insertedId} =
    await collection.insertOne({ name, description, price, imagePath })
    res.send({acknowledged, insertedId})

    
})

module.exports = router

