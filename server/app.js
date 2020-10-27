const express = require('express')
const cors = require('cors')
const app = express()
// app.use(cors())
// app.options('*',cors())
const mongoose = require('mongoose')
require('./Employee')
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const Employee = mongoose.model("employee")

// const password ='J5Upa81US0pX8oy7'
const mongoUri = 'mongodb+srv://cnq:J5Upa81US0pX8oy7@cluster0.ksg8i.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on("connected", () => {
    console.log('connection success!')
})

mongoose.connection.on("error", () => {
    console.log('connection error!')
})

app.get('/', (req, res) => {
    Employee.find({}).then(data => {
        res.send(data)
    }).catch(e => console.log(e))
})

app.post('/send-data', (req, res) => {

    console.log('req body', req.body)

    const employee = new Employee({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        salary: req.body.salary,
        picture: req.body.picture,
        position: req.body.position
    })
    employee.save().then(data => {
        console.log('saved data', data)
        res.send(data)
    }).catch(e => console.log(e))

})


app.post('/delete', (req, res) => {
    Employee.findByIdAndRemove(req.body.id).then(data => {
        console.log('deleted', data)
        res.send(data)
    }).catch(e => console.log(e))
})

app.post('/update', (req, res) => {
    Employee.findByIdAndUpdate(req.body.id, {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        salary: req.body.salary,
        picture: req.body.picture,
        position: req.body.position
    }).then(data => {
        console.log('updated data', data)
        res.send(data)
    }).catch(e => console.log('error', e))
})

app.listen(3000, () => {
    console.log('servr running')
})

