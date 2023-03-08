const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const postRoute = require('./routes/post')
require('dotenv').config()

const app = express()

mongoose.connect(process.env.DATABASE, {
                useNewUrlParser:true,
                useUnifiedTopology:false})
        .then(()=>console.log("Connected"))
        .catch((err)=>console.log(err))

app.use(express.json())
app.use(cors())
app.use(morgan("dev"))

app.use('/api', postRoute)

const port = process.env.PORT || 8080
app.listen(port, ()=>console.log(`Port ${port}`))