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
// const userId = db.users[0].user_data.id

app.use(express.json());

app.post('/calories-tracker/login', (req, res) => {
    const response = db.login(req.body.username, req.body.password)
    return res.send({...response})
})
app.post('/calories-tracker/register', (req, res) => {
    const response = db.register(req.body.username, req.body.password, uuid())
    return res.send({...response})
})

app.get(`/calories-tracker/:userId/user`, (req, res) => {
    const user = db.findById(req.params.userId)
    return res.send(user.user_data)
})
app.get(`/calories-tracker/:userId/days`, (req, res) => {
    const user = db.findById(req.params.userId)
    console.log(user)
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
app.patch('/calories-tracker/:userId/day', (req, res) => {
    const day = db.replaceDay(req.params.userId)
    return res.send({...day})
})
app.post('/calories-tracker/:userId/product', (req, res) => {
    const product = db.addProduct(req.params.userId, {...req.body})
    return res.send({...product})
})

app.post('/calories-tracker/:userId/day', (req, res) => {
    const day = db.addDay(req.params.userId, req.body.dayId)
    return res.send({...day})
})

app.listen(port, () => {
    console.log(`calories-tracker backend listening on http://localhost:${port}`)
})
