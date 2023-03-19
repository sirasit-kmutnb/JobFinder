const express = require('express')
const router = express.Router()
const { register, login, accountInfo } = require('../controller/authController.js')
const { requireLogin } = require('../controller/authController')

//register path
router.post('/register', register)
//login path
router.post('/login', login)
// router.post('/accountInfo', accountInfo)

module.exports = router