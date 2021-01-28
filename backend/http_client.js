const express = require('express')
const app = express()
const port = 5000
const {v4: uuid} = require('uuid')
const {Database} = require('./database')
const cors = require("cors")

app.use(cors())
app.options('*', cors())

const db = new Database()
db.register("user", "secret", uuid())

app.use(express.json());

app.post('/calories-tracker/login', (req, res) => {
    const userId = db.login(req.body.username, req.body.password)
    return res.send({userId})
})
app.post('/calories-tracker/register', (req, res) => {
    const userId = db.register(req.body.username, req.body.password, uuid())
    return res.send({userId})
})

app.get(`/calories-tracker/:userId/user`, (req, res) => {
    const user = db.findById(req.params.userId)
    return res.send(user.user_data)
})
app.get(`/calories-tracker/:userId/days`, (req, res) => {
    const user = db.findById(req.params.userId)
    return res.send(user.days)
})
app.get(`/calories-tracker/:userId/meals`, (req, res) => {
    const user = db.findById(req.params.userId)
    return res.send(user.meals)
})
app.get(`/calories-tracker/:userId/products`, (req, res) => {
    const user = db.findById(req.params.userId)
    return res.send(user.products)
})
app.patch('calories-tracker/:userId/day', (req, res) => {
    db.replaceDay(req.params.userId)
    return res.send("SUCCESS")
})
app.post('calories-tracker/:userId/product', (req, res) => {
    db.addProduct(req.params.userId, {...req.body})
    return res.send("SUCCESS")
})
app.post('calories-tracker/:userId/day', (req, res) => {
    db.addDay(req.params.userId, req.body.dayId)
    return res.send("SUCCESS")
})


app.listen(port, () => {
    console.log(`calories-tracker backend listening on http://localhost:${port}`)
})
