// import React, { useEffect, useState } from "react";
// import Layout from "../../components/Layout";
// // import {useSelector} from 'react-redux'
// import "@ant-design/v5-patch-for-react-19";
// import {
//   Col,
//   Form,
//   Input,
//   Row,
//   TimePicker,
//   message,
//   Badge,
//   Select,
// } from "antd";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { showLoading, hideLoading } from "../../redux/features/alertSlice";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import moment from "moment";
// const Profile = () => {
//   const { user } = useSelector((state) => state.user);
//   const [doctor, setDoctor] = useState(null);
//   const params = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { Option } = Select;

//   const specializationOptions = [
//     "Cardiologist",
//     "Dermatologist",
//     "Neurologist",
//     "Orthopedic",
//     "Pediatrician",
//     "Psychiatrist",
//     "General Physician",
//     "Others",
//   ];

//   const handleFinish = async (values) => {
//     // console.log(values);
//     try {
//       dispatch(showLoading());
//       const res = await axios.post(
//         "/api/v1/doctor/updateProfile",
//         {
//           ...values,
//           userId: user._id,
//           timings: [
//             values.timings[0].format("HH:mm"),
//             values.timings[1].format("HH:mm"),
//           ],
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       dispatch(hideLoading());
//       if (res.data.success) {
//         message.success(res.data.message);
//         navigate("/");
//       } else {
//         message.error(res.data.message);
//       }
//     } catch (err) {
//       dispatch(hideLoading());
//       console.log(err);
//       message.error("something went wrong");
//     }
//   };

//   // get doctor details
//   const getDoctorInfo = async () => {
//     try {
//       const res = await axios.post(
//         "/api/v1/doctor/getDoctorInfo",
//         { userId: params.id },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       if (res.data.success) {
//         setDoctor(res.data.data);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     getDoctorInfo();
//   }, []);

//   return (
//     <Layout>
//       <h1>Manage profile</h1>
//       {doctor && (
//         <Form
//           layout="vertical"
//           onFinish={handleFinish}
//           className="m-3"
//           // initialValues={{
//           //   ...doctor,
//           //   timings: [
//           //     moment(doctor.timings[0], "HH:mm"),
//           //     moment(doctor.timings[1], "HH:mm"),
//           //   ],
//           // }}
//           initialValues={
//             doctor
//               ? {
//                   ...doctor,
//                   timings: [
//                     moment(doctor.timings[0], "HH:mm"),
//                     moment(doctor.timings[1], "HH:mm"),
//                   ],
//                 }
//               : {}
//           }
//         >
//           <h4 className="">Personal details:</h4>
//           <Row gutter={15}>
//             <Col xs={24} md={24} lg={8}>
//               <Form.Item
//                 label="First name"
//                 name="firstName"
//                 required
//                 rules={[{ required: true }]}
//               >
//                 <Input type="text" placeholder="Your name" />
//               </Form.Item>
//             </Col>

//             <Col xs={24} md={24} lg={8}>
//               <Form.Item
//                 label="Last name"
//                 name="lastName"
//                 required
//                 rules={[{ required: true }]}
//               >
//                 <Input type="text" placeholder="Your name" />
//               </Form.Item>
//             </Col>

//             <Col xs={24} md={24} lg={8}>
//               <Form.Item
//                 label="Phone"
//                 name="phone"
//                 required
//                 rules={[{ required: true }]}
//               >
//                 <Input type="text" placeholder="Your phone number" />
//               </Form.Item>
//             </Col>

//             <Col xs={24} md={24} lg={8}>
//               <Form.Item
//                 label="Email"
//                 name="email"
//                 required
//                 rules={[{ required: true }]}
//               >
//                 <Input type="text" placeholder="Your email id" />
//               </Form.Item>
//             </Col>

//             {/* <Col xs={24} md={24} lg={8}>
//               <Form.Item
//                 label="Website"
//                 name="website"
//                 required
//                 rules={[{ required: true }]}
//               >
//                 <Input type="text" placeholder="Your website" />
//               </Form.Item>
//             </Col> */}

//             <Col xs={24} md={24} lg={8}>
//               <Form.Item
//                 label="Address"
//                 name="address"
//                 required
//                 rules={[{ required: true }]}
//               >
//                 <Input type="text" placeholder="Your address" />
//               </Form.Item>
//             </Col>
//           </Row>

//           <h4 className="">Professional details:</h4>
//           <Row gutter={15}>
//             {/* <Col xs={24} md={24} lg={8}>
//               <Form.Item
//                 label="Specialization"
//                 name="specialization"
//                 required
//                 rules={[{ required: true }]}
//               >
//                 <Input type="text" placeholder="Your specialization" />
//               </Form.Item>
//             </Col> */}
//             <Col xs={24} md={24} lg={8}>
//               <Form.Item
//                 label="Specialization"
//                 name="specialization"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please select your specialization",
//                   },
//                 ]}
//               >
//                 <Select placeholder="Select Specialization">
//                   {specializationOptions.map((specialization) => (
//                     <Option key={specialization} value={specialization}>
//                       {specialization}
//                     </Option>
//                   ))}
//                 </Select>
//               </Form.Item>
//             </Col>
//             ;
//             <Col xs={24} md={24} lg={8}>
//               <Form.Item
//                 label="Experience"
//                 name="experience"
//                 required
//                 rules={[{ required: true }]}
//               >
//                 <Input type="text" placeholder="Your experience" />
//               </Form.Item>
//             </Col>
//             <Col xs={24} md={24} lg={8}>
//               <Form.Item
//                 label="Fee"
//                 name="fee"
//                 required
//                 rules={[{ required: true }]}
//               >
//                 <Input type="text" placeholder="Your fee" />
//               </Form.Item>
//             </Col>
//             <Col xs={24} md={24} lg={8}>
//               <Form.Item
//                 label="Timings"
//                 name="timings"
//                 required
//                 rules={[{ required: true }]}
//               >
//                 {/* <TimePicker.RangePicker format="HH:mm" /> */}
//                 {doctor && doctor.timings && (
//                   <TimePicker.RangePicker format="HH:mm" />
//                 )}
//               </Form.Item>
//             </Col>
//             <Col xs={24} md={24} lg={8}></Col>
//             <Col xs={24} md={24} lg={8}>
//               <div className="d-flex justify-content-end">
//                 <button className="btn btn-primary form-btn" type="submit">
//                   Update
//                 </button>
//               </div>
//             </Col>
//           </Row>
//         </Form>
//       )}
//     </Layout>
//   );
// };

// export default Profile;


import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Col, Form, Input, Row, TimePicker, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/features/alertSlice";
import moment from "moment";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  // update doc ==========
  //handle form
  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/doctor/updateProfile",
        {
          ...values,
          userId: user._id,
          timings: [
            moment(values.timings[0]).format("HH:mm"),
            moment(values.timings[1]).format("HH:mm"),
          ],
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
        navigate("/");
      } else {
        message.error(res.data.success);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Somthing Went Wrrong ");
    }
  };
  // update doc ==========

  //getDOc Details
  const getDoctorInfo = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/getDoctorInfo",
        { userId: params.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        const doctorData = res.data.data;
  
        // Ensure timings is a valid array
        if (!Array.isArray(doctorData.timings) || doctorData.timings.length < 2) {
          doctorData.timings = ["08:00", "17:00"]; // Default values if missing
        }
  
        setDoctor(doctorData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  useEffect(() => {
    getDoctorInfo();
    //eslint-disable-next-line
  }, []);
  return (
    <Layout>
      <h1>Manage Profile</h1>
      {doctor && (
        <Form
        layout="vertical"
        onFinish={handleFinish}
        className="m-3"
        initialValues={
          doctor && doctor.timings
            ? {
                ...doctor,
                timings: [
                  doctor.timings[0] ? moment(doctor.timings[0], "HH:mm") : null,
                  doctor.timings[1] ? moment(doctor.timings[1], "HH:mm") : null,
                ],
              }
            : {}
        }
        >
          <h4 className="">Personal Details : </h4>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="First Name"
                name="firstName"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your first name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Last Name"
                name="lastName"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your last name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Phone No"
                name="phone"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your contact no" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Email"
                name="email"
                required
                rules={[{ required: true }]}
              >
                <Input type="email" placeholder="your email address" />
              </Form.Item>
            </Col>
            {/* <Col xs={24} md={24} lg={8}>
              <Form.Item label="Website" name="website">
                <Input type="text" placeholder="your website" />
              </Form.Item>
            </Col> */}
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Address"
                name="address"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your clinic address" />
              </Form.Item>
            </Col>
          </Row>
          <h4>Professional Details :</h4>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Specialization"
                name="specialization"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your specialization" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Experience"
                name="experience"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your experience" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Fees Per Cunsaltation"
                name="fee"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your contact no" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
            {/* <Form.Item
  label="Timings"
  name="timings"
  required
  rules={[{ required: true }]}
>
  {doctor && doctor.timings ? (
    <TimePicker.RangePicker format="HH:mm" />
  ) : (
    <span>Loading...</span>
  )}
</Form.Item> */}

<Form.Item
  label="Timings"
  name="timings"
  rules={[{ required: true, message: "Please select timings!" }]}
>
  <TimePicker.RangePicker
    format="HH:mm"
    defaultValue={
      doctor && doctor.timings
        ? [
            moment(doctor.timings[0], "HH:mm"),
            moment(doctor.timings[1], "HH:mm"),
          ]
        : []
    }
  />
</Form.Item>


            </Col>
            <Col xs={24} md={24} lg={8}></Col>
            <Col xs={24} md={24} lg={8}>
              <button className="btn btn-primary form-btn" type="submit">
                Update
              </button>
            </Col>
          </Row>
        </Form>
      )}
    </Layout>
  );
};

export default Profile;