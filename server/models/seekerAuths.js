const mongoose = require('mongoose')

const seekerSchema = mongoose.Schema({
    username: {
        type:String,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    firstname: {
        type:String,
        required:true
    },
    lastname: {
        type:String,
        required:true
    }
}, {timestamps:true})

module.exports = mongoose.model("seekerAuths", seekerSchema)