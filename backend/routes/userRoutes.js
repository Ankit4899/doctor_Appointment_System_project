const express = require('express')
const { loginController } = require('../controllers/userCtrl')
const { registerController } = require('../controllers/userCtrl')
const { authController } = require('../controllers/userCtrl')
const { applyDoctorController } = require('../controllers/userCtrl')
const { getAllNotificationController,deleteAllNotificationController } = require('../controllers/userCtrl')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()


router.post('/login',loginController)

router.post('/register',registerController)
router.post('/getUserData',authMiddleware,authController);

// Apply doctor

router.post("/apply-doctor",authMiddleware,applyDoctorController)
// Notification
router.post("/get-all-notification",authMiddleware,getAllNotificationController)

router.post("/delete-all-notification",authMiddleware,deleteAllNotificationController)
module.exports = router