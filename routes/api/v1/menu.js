const path = require ('path')
const router = require ('express').Router()

const menu = [
    {id:1, name: "pizza", description: "Cheesy goodness ", price: 9.99, image: " "},
    {id:2, name: "burger", description: "Juicy beef patty", price: 11.99, image: " "},
    {id:3, name: "taco", description: "Spicy chicken wrap", price: 8.99, image: " "},
    {id:4, name: "hotdog", description: "Grilled sausage in a bun", price: 4.99, image: " "},
    {id:5, name: "fries", description: "Crispy golden fries", price: 3.99, image: " "}
]

router.get('/', (req, res) => {
    res.json(menu)
})

router.get('/:id', (req, res) => {
    const {id} =req.params
    const found =menu.find(item => item.id.toString() === id)
    if (found) {
        res.json(found)
    } else {
        res.status(404).json({ message: "Menu item not found" })
    }
})

router.post ('/', (req, res) => {
    const {name, description, price, image} = req.body
    const newItem = {
        id: menu.length + 1,
        name,
        description,
        price,
        image
    }
    menu.push(newItem)
    res.status(201).json(newItem)
})
module.exports = router