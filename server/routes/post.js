const express = require('express')
const router = express.Router()
const { createPost, getAllPost, getPost, singlePost, removePost } = require('../controller/postController')
const { requireLogin } = require('../controller/authController')

router.post('/createPost', requireLogin, createPost)
router.get('/posts', getAllPost)
router.delete('/removePost/:slug',requireLogin, removePost)
router.get('/getPost', requireLogin, getPost)
router.get('/post/:slug',singlePost)

module.exports = router