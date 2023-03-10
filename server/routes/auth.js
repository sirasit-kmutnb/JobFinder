const express = require('express')
const router = express.Router()
const { register, login, accountInfo } = require('../controller/authController.js')

router.post('/register', register)
router.post('/login', login)
router.post('/accountInfo', accountInfo)

module.exports = router