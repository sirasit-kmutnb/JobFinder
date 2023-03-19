const Auths = require('../models/auths')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { ObjectId } = require('mongodb')
const { expressjwt: expressJWT } = require("express-jwt")
require('dotenv').config();

const secret = process.env.TOKEN_ENCODE

//register controller
exports.register=(req, res) => {
    // get data from body request
    const {email, username, password, confirmpassword, role, info1, info2} = req.body

    // check field no blank
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

    // if be seeker create object with firstname and lastname
    if(role==="Seeker") {
        var detailsObject = {
                            "firstname" : info1,
                            "lastname" : info2
                            }
    }
    // if be company create object with company name and details
    else if (role==="Company") {
        var detailsObject = {
            "company-name" : info1,
            "details" : info2
            }
    }

    
    bcrypt.genSalt(10, (err, salt)=>{
        // hash password with bcrypt by salt
        // password + salt = hash
        bcrypt.hash(password, salt, (err, hash)=>{
            // variable password = variable hash
            let password = hash
            // create data into database with password(encrypt) and force username to lowercase
            Auths.create({email, username:String(username).toLowerCase(), password, role, details:detailsObject})
            // send response when success
            .then((auth) => {res.json(auth)})
            //send error when fail
            .catch((err)=>{res.status(400).json({err:"This username or email is already used"})})
        })
    })
}

// login controller
exports.login = (req, res) => {
    // get data from body request
    const {username, password} = req.body
    // check field no blank
    switch(true) {
        case !username: {
            return res.status(400).json({err:"Please enter your username"})
            break
        }
        case !password: {
            return res.status(400).json({err:"Please enter your password"})
        }
    }
    // find username in database with lowercase
    Auths.findOne({username:String(username).toLowerCase()})
        .then((user)=>{
            // if found user 
            if(user){
                bcrypt
                // bcrypt password that got from body to compare with password(already bcrypt) that keep in database
                .compare(password, user.password)
                // got true when equal false when not equal
                .then((passwordCheck)=>{
                    //when false response err message
                    if(!passwordCheck){
                        return res.status(400).json({err:"Password doesn't match"})
                    }
                    //when true sign token with user id, username, role, subscription that sign with TokenEncode from ENV and token expire in 24hr
                    const token = jwt.sign({
                        userID : user._id,
                        userName : user.username,
                        userRole : user.role,
                        userSub : user.subscription
                    }, process.env.TOKEN_ENCODE, {expiresIn:"24h"})
                    // after sign token It ll send username, role, subscription and token in json
                    res.status(200).json({
                        message:`You have been login to ${username} successfully`,
                        userName : user.username,
                        userRole : user.role,
                        userSub: user.subscription,
                        token
                    })
                    // console.log(user)
                })
                .catch((err)=>{
                    res.status(400).json({err:"Password is wrong"})
                })

            }
            else {
                res.status(400).json({err:"Username doesn't exist"})
            }
        })
        .catch((err)=>{
            if(err) {
                console.log(err)
            }
        })
}

// exports.accountInfo = (req, res) => {
//     var {accountID} = req.body
//     const mongoObject = new ObjectId(accountID);
//     Auths.findOne({"_id" : mongoObject})
//     .select("-password")
//     .then((data)=>{
//         if (!data) {
//             res.status(404).json({ error: "not found" });
//           } else {
//             res.json(data);
//             // console.log(data)
//           }
//     })
//     .catch((err)=>{
//         res.staus(400).json(err)
//     })
// }

//prevent user without token use api that use secret(TokenEncode from ENV
exports.requireLogin=expressJWT({
    secret:secret,
    algorithms:["HS256"],
    userProperty:"auth"
})