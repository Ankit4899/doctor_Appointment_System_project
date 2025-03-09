import React from "react";
import '@ant-design/v5-patch-for-react-19';
import { Form, Input, message } from "antd";
import "../styles/LoginStyle.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showLoading,hideLoading } from "../redux/features/alertSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Form handler
  const onFinishHandler = async (values) => {
    // console.log(values);
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/login", values);
      window.location.reload()
      dispatch(hideLoading());

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success("Login success");
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (err) {
      dispatch(hideLoading());
      console.log(err);
      message.error("Something wrong");
    }
  };
  return (
    <div className="container">
{/* Doctor Illustration */}
{ <img
src="/doc.jpg"  // Ensure this image is in your public folder
alt="Doctor"
className="doctor-img"
/> }
      <div className="form-container">
        <Form
          layout="vertical"
          onFinish={onFinishHandler}
          className="register-form"
        >
          <h1 className="text-center">User Login</h1>

          <Form.Item label="Email" name="email">
            <Input type="text" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>
          <button className="btn btn-primary" type="submit">
            Login
          </button>
          <Link to="/register" className="m-2">
            New User? Register
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default Login;
