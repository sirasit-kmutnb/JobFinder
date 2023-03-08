const {v4: uuidv4} = require('uuid')
const Posts = require('../models/posts')
const { response } = require("express");
const posts = require('../models/posts');

exports.createPost=(req, res) => {
    const {title, author, details, role} = req.body
    let slug=uuidv4()

    switch(true){
        case !title:
            return res.status(400).json({err:"no title"})
            break;
        case !author:
            return res.status(400).json({err:"no author"})
            break;
        case !details:
            return res.status(400).json({err:"no details"})
            break;
        case !role:
            return res.status(400).json({err:"no role"})
            break;
    }

    // Posts.create({title, author, details, role, slug}, (err, post)=>{
    //     if(err){
    //         res.status(400).json({err:"something wrong"})
    //     }
    //     res.json(post)
    // })
    Posts.create({title, author, details, role, slug})
        .then((post) => {res.json(post)})
        .catch((err)=>{res.status(400).json({err:"something wrong"})})
}

exports.getAllPost=(req, res) => {
    // Posts.find({}).exec((err, posts) => {
    //     res.json(posts)
    // })
    Posts.find({}).exec()
        .then((posts) => {res.json(posts)})
}