const express = require('express')
const router = express.Router()
const { createPost, getAllPost, getPost, singlePost, removePost, updatePost } = require('../controller/postController')
const { requireLogin } = require('../controller/authController')

// create post path (required token)
router.post('/createPost', requireLogin, createPost)
// get all post path
router.get('/posts', getAllPost)
// remove post path (required token)
router.delete('/removePost/:slug',requireLogin, removePost)
// get my post path (required token)
router.get('/getPost', requireLogin, getPost)
// get single post path
router.get('/post/:slug',singlePost)
// update post path (required token)
router.put('/updatePost/:slug', requireLogin, updatePost)

module.exports = router