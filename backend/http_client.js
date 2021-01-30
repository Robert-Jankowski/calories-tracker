const express = require('express')
const app = express()
const port = 5000
const {v4: uuid} = require('uuid')
const {Database} = require('./database')
const cors = require("cors")

app.use(cors())
app.options('*', cors())

const db = new Database()

//TESTS
db.register("user", "secret", uuid())
const userId = db.users[0].user_data.id
db.addProduct(userId, {
        id: "1",
        name: "egg",
        calories: 80,
        proteins: 10,
        carbs: 2,
        fats: 7
    })
db.addProduct(userId, {
    id: "2",
    name: "chicken",
    calories: 120,
    proteins: 9,
    carbs: 3,
    fats: 5
})
db.addProduct(userId, {
    id: "3",
    name: "tomato",
    calories: 170,
    proteins: 22,
    carbs: 32,
    fats: 37
})
const user = db.findById(userId)
user.meals = [...user.meals, {
    id: "6",
    products: ["1","2","3"],
    mealtype: "lunch"
}]
db.addDay(userId, "2021-01-28")
user.days[0].meals = [...user.days[0].meals, "6"]
//

//API
app.use(express.json());

//LOGIN
app.post('/calories-tracker/login', (req, res) => {
    const response = db.login(req.body.username, req.body.password)
    return res.send({...response})
})
//REGISTER
app.post('/calories-tracker/register', (req, res) => {
    const response = db.register(req.body.username, req.body.password, uuid())
    return res.send({...response})
})
//GET USER DATA
app.get(`/calories-tracker/:userId/user`, (req, res) => {
    const user = db.findById(req.params.userId)
    return res.send(user.user_data)
})
//GET USER DAYS
app.get(`/calories-tracker/:userId/days`, (req, res) => {
    const user = db.findById(req.params.userId)
    return res.send(user.days)
})
//GET USER MEALS
app.get(`/calories-tracker/:userId/meals`, (req, res) => {
    const user = db.findById(req.params.userId)
    return res.send(user.meals)
})
//GET USER PRODUCTS
app.get(`/calories-tracker/:userId/products`, (req, res) => {
    const user = db.findById(req.params.userId)
    return res.send(user.products)
})

//ADD PRODUCT
app.post('/calories-tracker/:userId/product', (req, res) => {
    const product = db.addProduct(req.params.userId, {...req.body})
    return res.send({...product})
})
//ADD DAY
app.post('/calories-tracker/:userId/day', (req, res) => {
    const day = db.addDay(req.params.userId, req.body.dayId)
    return res.send({...day})
})

//REPLACE DAY
app.patch('/calories-tracker/:userId/day', (req, res) => {
    const day = db.replaceDay(req.params.userId, req.body)
    return res.send({...day})
})
//REPLACE MEAL
app.patch('/calories-tracker/:userId/meal', (req, res) => {
    const meal = db.replaceMeal(req.params.userId, req.body)
    return res.send({...meal})
})

//DELETEMEAL
app.delete('/calories-tracker/:userId/meals/:mealId', (req, res) => {
    db.deleteMeal(req.params.userId, req.params.mealId)
    return res.send("SUCCESS")
})
//ADDMEAL
app.post('/calories-tracker/:userId/meals', (req,res) => {
    const newMeal = db.addMeal(req.params.userId ,req.body.meal_type, req.body.meal_id)
    return res.send({...newMeal})
})

app.listen(port, () => {
    console.log(`calories-tracker backend listening on http://localhost:${port}`)
})
