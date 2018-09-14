const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const ticket = require('./routes/index')
const config = require('./config/index')
const PORT = process.env.PORT || 8080;
const app = express()

app.use(bodyParser.urlencoded({extended:true}))

app.use(bodyParser.json())

mongoose.connect(config.url)
app.use(cors())

ticket(app)

app.listen(PORT);
console.log(`app listening on port ${PORT}`);