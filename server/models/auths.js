const mongoose = require('mongoose')

const authSchema = mongoose.Schema({
    username: {
        type:String,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required:true
    },
    role: {
        type:String,
        required:true,
    },
    details: {
        type:{},
        required:true
    }
}, {timestamps:true})

module.exports = mongoose.model("auths", authSchema)