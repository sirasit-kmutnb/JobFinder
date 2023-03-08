const express = require('express')
const router = express.Router()
const { createPost, getAllPost } = require('../controller/postController')

router.post('/createPost', createPost)
router.get('/posts', getAllPost)

module.exports = router