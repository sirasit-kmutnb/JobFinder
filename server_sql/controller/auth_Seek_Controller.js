const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(
 'JobFinder_db',
 'root',
 'Model@1234', // Dont forget your password!!! 
  {
    host: 'localhost',
    dialect: 'mysql'
  }
);

const seeker = require('../models/seeker')( sequelize , Sequelize );
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { expressjwt: expressJWT } = require("express-jwt")
require('dotenv').config();

const secret = process.env.TOKEN_ENCODE

exports.register_seek=(req, res) => {
    const {fname, lname, username, password, confirmpassword, email} = req.body
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
        case !fname:{
            return res.status(400).json({err:"Please enter your first name"})
        }
        case !lname:{
            return res.status(400).json({err:"Please enter last detail"})
        }
    }


    bcrypt.genSalt(10, (err, salt)=>{
        bcrypt.hash(password, salt, (err, hash)=>{
            let password = hash
            seeker.create({
                s_fname: fname, 
                s_lname: lname, 
                s_uname: String(username).toLowerCase(), 
                s_pass: password, 
                s_email: email})
            .then((auth) => {res.json(auth)})
            .catch((err)=>{res.status(400).json({err:"This username is already used"})})
            //  .catch((err)=>{res.status(400).json(err)})
        })
    })
}

exports.login_seek = (req, res) => {
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

    sequelize.sync().then(() => {
        seeker.findOne({where: {s_uname: String(username).toLowerCase()}})
            .then((user)=>{
                if(user){
                    bcrypt
                    .compare(password, user.s_pass)
                    .then((passwordCheck)=>{
                        if(!passwordCheck){
                            return res.status(400).json({err:"Password doesn't match"})
                        }
                        const token = jwt.sign({
                            userID : user.s_id,
                            userName : user.s_uname,
                            userSub : user.s_subscription
                        }, process.env.TOKEN_ENCODE, {expiresIn:"24h"})
                        res.status(200).json({
                            message:`You have been login to ${username} successfully`,
                            userName : user.s_uname,
                            token
                        })
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
                    res.json(err)
                }
            })
    }).catch((error) => {
        console.error('Unable to create table : ', error);
    });

}

exports.accountInfo = async (req, res) => {
    const { accountID } = req.body;
    try {
      const data = await seeker.findByPk(accountID, { attributes: { exclude: ['c_pass'] } });
      if (!data) {
        res.status(404).json({ error: 'not found' });
      } else {
        res.json(data);
      }
    } catch (err) {
      res.status(400).json(err);
    }
  };

exports.requireLogin=expressJWT({
    secret:secret,
    algorithms:["HS256"],
    userProperty:"auth"
})