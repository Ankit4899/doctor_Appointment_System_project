import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import "@ant-design/v5-patch-for-react-19";
import { DatePicker, TimePicker, message } from "antd";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
const BookingPage = () => {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [isAvailable, setIsAvailable] = useState();
  const dispatch = useDispatch();
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/getDoctorById",
        { doctorId: params.doctorId },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleBooking = async () => {
    try {
      setIsAvailable(true)
      if(!date && !time){
        return alert("Date & Time are required")
      }
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctors,
          date: date,
          userInfo: user,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  //checking availability

  const handleAvailability = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/booking-availability",
        {
          doctorId: params.doctorId,
          date,
          time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        setIsAvailable(true);
        console.log(isAvailable)
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  },[]);
  return (
    <Layout>
      <h3>BookingPage</h3>
      <div className="container m-2">
        {doctors && (
          <div>
            <h4>
              Dr. {doctors.firstName} {doctors.lastName}
            </h4>
            <h4>Fees: {doctors.fee}</h4>
            {/* <h4>
              Timings: {doctors.timings[0]} - {doctors.timings[1]}
            </h4> */}
            <h4>
              Timings : {doctors.timings && doctors.timings[0]} -{" "}
              {doctors.timings && doctors.timings[1]}{" "}
            </h4>
            <div className="d-flex flex-column w-35">
              <DatePicker
                className="m-2"
                format={"DD-MM-YYYY"}
                onChange={(value) =>
                  {setIsAvailable(false)
                  setDate(moment(value).format("DD-MM-YYYY"))}
                }
              />
              <TimePicker
                className="m-2"
                format={"HH:mm"}
                // onChange={(value) => {
                //   setIsAvailable(false)
                //   setTime(moment(value).format("HH:mm"))}}
                onChange={(value) => {
                  setIsAvailable(false);
                  if (value) {
                    setTime(moment(value).format("HH:mm"));
                  } else {
                    setTime(""); // Clear time if no value is selected
                  }
                }}
                
              />
              <button
                className="btn btn-primary mt-2"
                onClick={handleAvailability}
              >
                Check availability
              </button>
              {!isAvailable && (
                <button className="btn btn-dark mt-2" onClick={handleBooking}>
                  Book now
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BookingPage;
