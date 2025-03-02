const express = require('express');
const { getAllUsersController,getAllDoctorsController, changeAccountStatusController } = require('../controllers/adminCtrl');
const router = express.Router()
const authMiddleware = require('../middlewares/authMiddleware')

// get users
router.get('/getAllUsers',authMiddleware,getAllUsersController)

// get doctors
router.get('/getAllDoctors',authMiddleware,getAllDoctorsController)

// Post account status
router.post('/changeAccountStatus',authMiddleware,changeAccountStatusController)

module.exports = router;