const express = require('express')
const { loginController } = require('../controllers/userCtrl')
const { registerController } = require('../controllers/userCtrl')


const router = express.Router()


router.post('/login',loginController)

router.post('/register',registerController)
module.exports = router