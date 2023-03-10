const express = require('express')
const router = express.Router()
const { createPost, getAllPost, getPost, singlePost } = require('../controller/postController')
const { requireLogin } = require('../controller/authController')

router.post('/createPost', createPost)
router.get('/posts', getAllPost)
router.get('/getPost', getPost)
router.get('/post/:slug',singlePost)

module.exports = router