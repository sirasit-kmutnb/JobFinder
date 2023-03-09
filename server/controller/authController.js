const Auths = require('../models/auths')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

exports.register=(req, res) => {
    const {email, username, password, confirmpassword, role, info1, info2} = req.body
    switch(true) {
        case !email:{
            return res.status(400).json({err:"Please enter your email"})
        }
        case !username:{
            return res.status(400).json({err:"Please enter your username"})
        }
        case !password:{
            return res.status(400).json({err:"Please enter your password"})
        }
        case password!=confirmpassword:{
            return res.status(400).json({err:"Password doesn't match"})
        }
        case !role:{
            return res.status(400).json({err:"Please enter your role"})
        }
        case !info1:{
            return res.status(400).json({err:"Please enter info1"})
        }
        case !info2:{
            return res.status(400).json({err:"Please enter info2"})
        }
    }

    if(role==="Seeker") {
        var detailsObject = {
                            "firstname" : info1,
                            "lastname" : info2
                            }
    }
    else if (role==="Company") {
        var detailsObject = {
            "company-name" : info1,
            "details" : info2
            }
    }

    bcrypt.genSalt(10, (err, salt)=>{
        bcrypt.hash(password, salt, (err, hash)=>{
            let password = hash
            Auths.create({email, username:String(username).toLowerCase(), password, role, details:detailsObject})
            .then((auth) => {res.json(auth)})
            .catch((err)=>{res.status(400).json({err:"This username is already used"})})
            //  .catch((err)=>{res.status(400).json(err)})
        })
    })
}

exports.login = (req, res) => {
    const {username, password} = req.body

    switch(true) {
        case !username: {
            return res.status(400).json({err:"Please enter your username"})
            break
        }
        case !password: {
            return res.status(400).json({err:"Please enter your password"})
        }
    }

    Auths.findOne({username:String(username).toLowerCase()})
        .then((user)=>{
            if(user){
                bcrypt
                .compare(password, user.password)
                .then((passwordCheck)=>{
                    if(!passwordCheck){
                        return res.status(400).json({err:"Password doesn't match"})
                    }
                    const token = jwt.sign({
                        userID : user._id,
                        userName : user.username,
                        userRole : user.role,
                        userSub : user.subscription
                    }, process.env.TOKEN_ENCODE, {expiresIn:"24h"})
                    res.status(200).json({
                        message:`You have been login to ${username} successfully`,
                        userName : user.username,
                        token
                    })
                })
                .catch((err)=>{
                    res.status(400).json({err})
                })

            }
            else {
                res.status(400).json({err:"Username doesn't exist"})
            }
        })
        .catch((err)=>{
            if(err) {
                res.json(err)
            }
        })

}