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

const company = require('../models/company')( sequelize , Sequelize );
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { expressjwt: expressJWT } = require("express-jwt")
require('dotenv').config();

const secret = process.env.TOKEN_ENCODE

exports.register_comp=(req, res) => {
    const {name, username, password, confirmpassword, email, detail } = req.body
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
        case !name:{
            return res.status(400).json({err:"Please enter your company name"})
        }
        case !detail:{
            return res.status(400).json({err:"Please enter detail"})
        }
    }

    sequelize.sync().then(() => {

        bcrypt.genSalt(10, (err, salt)=>{
            bcrypt.hash(password, salt, (err, hash)=>{
                let password = hash
                company.create({
                    c_name: name,
                    c_uname: String(username).toLowerCase(),
                    c_pass: password,
                    c_email: email,
                    c_detail: detail
                  })
                .then((auth) => {res.json(auth)})
                .catch((err)=>{res.status(400).json({err:"This username is already used"})})
                //  .catch((err)=>{res.status(400).json(err)})
            })
        })

    }).catch((error) => {
        console.error('Unable to create table : ', error);
    });
}

exports.login_comp = (req, res) => {
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
        company.findOne({where: {c_uname: String(username).toLowerCase()}})
            .then((user)=>{
                if(user){
                    bcrypt
                    .compare(password, user.c_pass)
                    .then((passwordCheck)=>{
                        if(!passwordCheck){
                            return res.status(400).json({err:"Password doesn't match"})
                        }
                        const token = jwt.sign({
                            userID : user.c_id,
                            userName : user.c_uname,
                            userSub : user.c_subscription
                        }, process.env.TOKEN_ENCODE, {expiresIn:"24h"})
                        res.status(200).json({
                            message:`You have been login to ${username} successfully`,
                            userName : user.c_uname,
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
      const data = await company.findByPk(accountID, { attributes: { exclude: ['c_pass'] } });
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