const express = require('express')
const router = express.Router()
const { register_comp, login_comp} = require('../controller/auth_Comp_Controller.js')
const { register_seek, login_seek} = require('../controller/auth_Seek_Controller.js')

router.post('/register_comp', register_comp)
router.post('/login_comp', login_comp)

router.post('/register_seek', register_seek)
router.post('/login_seek', login_seek)

module.exports = router