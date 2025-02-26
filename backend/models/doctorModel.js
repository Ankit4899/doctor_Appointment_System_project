const mongoose = require("mongoose");
const doctorSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  firstName: {
    type: String,
    required: [true, "first name is required"],
  },
  lastName: {
    type: String,
    required: [true, "last name is required"],
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: [true, "address is required"],
  },
  specialization: {
    type: String,
    required: [true, "speciality is required"],
  },
  experience: {
    type: String,
    required: [true, "experience is required"],
  },
  status:{
    type:String,
    default:"pending"
  },
  fee: {
    type: Number,
    required: [true, "fee is required"],
  },
  timings: {
    type: Object,
    required: [true, "work timings"],
  },
},{timestamps:true});

const doctorModel = mongoose.model("doctors", doctorSchema);

module.exports = doctorModel;
