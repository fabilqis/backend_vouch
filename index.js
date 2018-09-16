const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const index = require('./routes/index')
const config = require('./config/index')
const PORT = process.env.PORT || 8080;
const app = express()

mongoose.connect(config.url)
app.use(cors())

app.use(bodyParser.urlencoded({extended:true}))

app.use(bodyParser.json())

index(app)

app.listen(PORT);
console.log(`app listening on port ${PORT}`);