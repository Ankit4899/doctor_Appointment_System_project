const express = require("express");
const { loginController } = require("../controllers/userCtrl");
const { registerController } = require("../controllers/userCtrl");
const { authController } = require("../controllers/userCtrl");
const { applyDoctorController } = require("../controllers/userCtrl");
const {
  getAllNotificationController,
  deleteAllNotificationController,
  getAllDoctorsController,
  bookAppointmentController,
  bookingAvailabilityController,
  userAppointmentsController
  
} = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/login", loginController);

router.post("/register", registerController);
router.post("/getUserData", authMiddleware, authController);

// Apply doctor

router.post("/apply-doctor", authMiddleware, applyDoctorController);
// Notification
router.post(
  "/get-all-notification",
  authMiddleware,
  getAllNotificationController
);

router.post(
  "/delete-all-notification",
  authMiddleware,
  deleteAllNotificationController
);
// get all doctors

router.get("/getAllDoctors", authMiddleware, getAllDoctorsController);
// Booking appointment
router.post("/book-appointment", authMiddleware, bookAppointmentController);

// Checking availability

router.post('/booking-availability',authMiddleware,bookingAvailabilityController)


// Appointments list

router.get('/users-appointments',authMiddleware,userAppointmentsController)
module.exports = router;
