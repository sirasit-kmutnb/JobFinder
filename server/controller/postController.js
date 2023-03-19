const {v4: uuidv4} = require('uuid')
const Posts = require('../models/posts')
const jwt = require('jsonwebtoken')

// console.log(process.env.TOKEN_ENCODE)


// create post controller
exports.createPost=(req, res) => {
    //get data from body request 
    const {title, details, role} = req.body
    //generate slug with uuidv4
    let slug=uuidv4()
    // get token from header
    var token = req.headers.authorization
    // slice "Bearer " from raw token in header
    var token = token ? token.slice(7) : null
    // decode jwt to get data object in jwt with TokenEncode from ENV
    var userInfo = jwt.verify(token, process.env.TOKEN_ENCODE)
    // get userID and userName from data object in jwt that decoded
    var ID = userInfo.userID
    var Name = userInfo.userName

    // check field no blank
    switch(true){
        case !title:
            return res.status(400).json({err:"no title"})
            break;
        case !details:
            return res.status(400).json({err:"no details"})
            break;
        case !role:
            return res.status(400).json({err:"no role"})
            break;
    }

    //create post into database if success return post data if fail return status 400 with error message
    Posts.create({title, author:Name, author_id:ID, details, role, slug})
        .then((post) => {res.json(post)})
        .catch((err)=>{res.status(400).json({err:"something wrong"})})
}
// get all post controller
exports.getAllPost=(req, res) => {
    //find all in database that sort from time and response Array of posts
    Posts.find({}).sort({createdAt: -1}).exec()
        .then((posts) => {
            res.json(posts)
        })
}

// update post controller
exports.updatePost=(req, res) => {
    //get slug from parameter in URI
    const {slug} = req.params
    //get data from body request
    const {title, details, role} = req.body

    //find post from database and update with new data from body requese when success response new post when fail response error
    Posts.findOneAndUpdate({slug},{title, details, role},{new:true}).exec()
        .then((post)=>{
            res.json(post)
        })
        .catch((err)=>{
            res.status(400).json(err)
        })
}

// getPost controller for Company user
exports.getPost=(req, res) => {
    //get token from header
    var token = req.headers.authorization
    // slide "Bearer " from raw token in header
    var token = token ? token.slice(7) : null;
    // decode jwt
    var userInfo = jwt.verify(token, process.env.TOKEN_ENCODE)
    if(userInfo) {
        var id = userInfo.userID
        //find post from author_id if success response array of post if fail response error message
        Posts.find({author_id:id}).exec()
            .then((data)=>{
                res.json(data)
            })
            .catch((err)=>{
                res.status(400).json({err:"cant find"})
            })
    }
}


// single post controller
exports.singlePost=(req,res)=> {
    //get slug from parameter in URI
    const {slug} =req.params
    // find post from slug if success response post data
    Posts.findOne({slug}).exec()
        .then((post)=>{
            res.json(post)
        })
}

// remove post controller 
exports.removePost=(req, res)=> {
    //get slug from parameter in URI
    const {slug} = req.params
    // find post from slug if found it ll be removed and response message if fail response error
    Posts.findOneAndRemove({slug}).exec()
        .then((res)=>{
            res.json({message:"ลบบทความเรียบร้อย"})
        })
        .catch((err)=>{
            console.log(err)
        })
}