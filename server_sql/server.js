const express = require("express");
const app = express();
app.use(express.json());
const morgan = require('morgan')
const cors = require('cors')
const postRoute = require('./routes/post')
const authRoute = require('./routes/auth')
require('dotenv').config()
const url = "/api"

// const db = require('/index.js');
// const { company, seeker, post, interest } = db
// db.sequelize.sync();

app.use(express.json())
app.use(cors())
app.use(morgan("dev"))

app.use(url, postRoute)
app.use(url, authRoute)

app.listen(3000, () =>{
console.log("sever run on port " + 3000);
});