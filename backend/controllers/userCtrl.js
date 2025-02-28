// const userModel = require("../models/userModels");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// import '@ant-design/v5-patch-for-react-19';
// const doctorModel = require("../models/doctorModel");
// const registerController = async (req, res) => {
//   try {
//     const existingUser = await userModel.findOne({ email: req.body.email });
//     if (existingUser) {
//       return res
//         .status(200)
//         .send({ message: "user already exist", success: false });
//     }
//     const password = req.body.password;
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);
//     req.body.password = hashedPassword;

//     const newUser = new userModel(req.body);
//     await newUser.save();
//     res.status(201).send({ message: "Registered successfully", success: true });
//   } catch (err) {
//     console.log(err);
//     res
//       .status(500)
//       .send({ success: false, message: `register controller ${err.message}` });
//   }
// };

// const loginController = async (req, res) => {
//   try {
//     const user = await userModel.findOne({ email: req.body.email });
//     if (!user) {
//       return res
//         .status(200)
//         .send({ message: "user not found", success: false });
//     }
//     const isMAtch = await bcrypt.compare(req.body.password, user.password);
//     if (!isMAtch) {
//       return res
//         .status(200)
//         .send({ message: "Invalid email or password", success: false });
//     }

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "1d",
//     });
//     res
//       .status(200)
//       .send({ message: "Login success", success: true, token: token });
//   } catch (err) {
//     console.log(err);
//     res.status(500).send({ message: `Error in Login ${err.message}` });
//   }
// };

// const authController = async (req, res) => {
//   try {
//     const user = await userModel.findOne({ _id: req.body.userId });
//     user.password = undefined;
//     if (!user) {
//       return res
//         .status(200)
//         .send({ message: `user not found`, success: false });
//     } else {
//       res.status(200).send({
//         success: true,
//         data: user,
//       });
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).send({
//       message: `Error in Authorization ${err.message}`,
//       success: false,
//     });
//   }
// };
// const applyDoctorController = async (req, res) => {
//   try {
//     const newDoctor = new doctorModel({ ...req.body, status: "pending" });
//     await newDoctor.save();
//     const adminUser = await userModel.findOne({ isAdmin: true });
//     if (!adminUser) {
//       return res.status(404).send({ message: "Admin user not found", success: false });
//     }
//     const notification = adminUser.notification;
//     notification.push({
//       type: "apply-doctor-request",
//       message: `${newDoctor.firstName} ${newDoctor.lastName} has apply for a doctor account`,
//       data: {
//         doctorId: newDoctor._id,
//         name: newDoctor.firstName + " " + newDoctor.lastName,
//         onClickPath: "/admin/doctors",
//       },
//     });
//     await userModel.findByIdAndUpdate(adminUser._id, { notification });
//     res.status(201).send({
//       success: true,
//       message: "Doctor account Applied",
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).send({
//       err,
//       message: "Error while applying",
//       success: false,
//     });
//   }
// };

// const notificationController = async (req, res) => {
//   try {
//     const user = await userModel.findOne({ _id: req.body.userId });
//     if (!user) {
//       return res.status(404).send({ success: false, message: "User not found" });
//     }

//     user.seen.push(...user.notification);
//     user.notification = [];

//     const updatedUser = await user.save();
//     res.status(200).send({
//       success: true,
//       message: "All notifications marked as read",
//       data: updatedUser,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).send({
//       err,
//       message: "Error in notification",
//       success: false,
//     });
//   }
// };


// module.exports = {
//   loginController,
//   registerController,
//   authController,
//   applyDoctorController,
//   notificationController
// };



const userModel = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const doctorModel = require("../models/doctorModel");

//register callback
const registerController = async (req, res) => {
  try {
    const exisitingUser = await userModel.findOne({ email: req.body.email });
    if (exisitingUser) {
      return res
        .status(200)
        .send({ message: "User Already Exist", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).send({ message: "Register Sucessfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Register Controller ${error.message}`,
    });
  }
};

// login callback
const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "user not found", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Invlid EMail or Password", success: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).send({ message: "Login Success", success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Error in Login CTRL ${error.message}` });
  }
};

const authController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res.status(200).send({
        message: "user not found",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "auth error",
      success: false,
      error,
    });
  }
};

// APpply DOctor CTRL
const applyDoctorController = async (req, res) => {
  try {
    const newDoctor = await doctorModel({ ...req.body, status: "pending" });
    await newDoctor.save();
    const adminUser = await userModel.findOne({ isAdmin: true });
    const notifcation = adminUser.notifcation;
    notifcation.push({
      type: "apply-doctor-request",
      message: `${newDoctor.firstName} ${newDoctor.lastName} Has Applied For A Doctor Account`,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.firstName + " " + newDoctor.lastName,
        onClickPath: "/admin/docotrs",
      },
    });
    await userModel.findByIdAndUpdate(adminUser._id, { notifcation });
    res.status(201).send({
      success: true,
      message: "Doctor Account Applied SUccessfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error WHile Applying For Doctotr",
    });
  }
};

//notification ctrl
const notificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    const seennotification = user.seen;
    const notification = user.notification;
    seen.push(...notification);
    user.notification = [];
    user.seen = notification;
    const updatedUser = await user.save();
    res.status(200).send({
      success: true,
      message: "all notification marked as read",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in notification",
      success: false,
      error,
    });
  }
};

module.exports = {
  loginController,
  registerController,
  authController,
  applyDoctorController,
  notificationController,
};