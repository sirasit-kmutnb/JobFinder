const jwt = require('jsonwebtoken')
require('dotenv').config()

const user = {
    "_id": "1234",
    "username": "model",
    "role": "Seeker",
    "subscription": false
}

// console.log(user)

const token = jwt.sign({
    userID : user._id,
    userName : user.username,
    userRole : user.role,
    userSub : user.subscription
}, process.env.TOKEN_ENCODE, {expiresIn:"24h"})

// console.log(process.env.TOKEN_ENCODE)
// console.log(token)

const payload = jwt.verify(token, process.env.TOKEN_ENCODE)
console.log(payload)