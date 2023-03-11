const {v4: uuidv4} = require('uuid')
const Posts = require('../models/posts')
const { response } = require("express");

exports.createPost=(req, res) => {
    const {title, author_id, details, role} = req.body
    let slug=uuidv4()

    switch(true){
        case !title:
            return res.status(400).json({err:"no title"})
            break;
        case !author_id:
            return res.status(400).json({err:"no author"})
            break;
        case !details:
            return res.status(400).json({err:"no details"})
            break;
        case !role:
            return res.status(400).json({err:"no role"})
            break;
    }

    Posts.create({title, author_id, details, role, slug})
        .then((post) => {res.json(post)})
        .catch((err)=>{res.status(400).json({err:"something wrong"})})
}

exports.getAllPost=(req, res) => {
    Posts.find({}).sort({createdAt: -1}).exec()
        .then((posts) => {
            res.json(posts)
        })
}

// exports.updatePost=(req, res) => {
//     const {slug} = req.params
//     Posts.findOneAndUpdate({slug}, {title, details, role}, {new:true}).exec()
//         .then((post) => {res.json(post)})
//         .catch((err) => {res.status(400).json(err)})
// }