const doctorModel = require("../models/doctorModel");
const getDoctorInfoController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: "doctor Info fetched",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in fetching doctor details",
    });
  }
};

const updateProfileController = async (req,res) => {
  try {
    const doctor = await doctorModel.findOneAndUpdate({userId:req.body.userId},req.body)
    res.status(201).send({
        success: true,
        message: "doctor profile updated",
        data: doctor,
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error updating doctor details",
    });
  }
};


const getDoctorByIdController = async (req,res)=>{
try{
const doctor = await doctorModel.findOne({_id:req.body.doctorId})
res.status(201).send({
  success: true,
  message: "doctor info fetched",
  data: doctor,
});
}catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error updating doctor details",
    });
  }
}

 
module.exports = { getDoctorInfoController, updateProfileController,getDoctorByIdController };
