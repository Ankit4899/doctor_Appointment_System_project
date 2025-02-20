const express = require('express')
const { loginController } = require('../controllers/userCtrl')
const { registerController } = require('../controllers/userCtrl')
const { authController } = require('../controllers/userCtrl')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()


router.post('/login',loginController)

router.post('/register',registerController)
router.post('/getUserData',authMiddleware,authController);
module.exports = router