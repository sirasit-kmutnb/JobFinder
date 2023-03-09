const Auths = require('../models/auths')

exports.register=(req, res) => {
    const {username, password, role, field1, field2} = req.body

    switch(true) {
        case !username:{
            return res.status(400).json({err:"Please enter your username"})
        }
        case !password:{
            return res.status(400).json({err:"Please enter your password"})
        }
        case !role:{
            return res.status(400).json({err:"Please enter your role"})
        }
        case !field1:{
            return res.status(400).json({err:"Please enter info1"})
        }
        case !field2:{
            return res.status(400).json({err:"Please enter info2"})
        }
    }

    Auths.create({username:String(username).toLowerCase(), password})
        .then((auth) => {res.json(auth)})
        .catch((err)=>{res.status(400).json({err:"This username is already used"})})
}