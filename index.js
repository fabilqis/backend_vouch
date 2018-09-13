const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const ticket = require('./routes/index')
const config = require('./config/index')

const app = express()

app.use(bodyParser.urlencoded({extended:true}))

app.use(bodyParser.json())

mongoose.connect(config.url)
app.use(cors())

ticket(app)
app.listen(8080,() => console.log('listening port 8080'))