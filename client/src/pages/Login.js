import React from "react";
import { Form, Input, message } from "antd";
import "../styles/LoginStyle.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const navigate = useNavigate();
  // Form handler
  const onFinishHandler = async (values) => {
    // console.log(values);
    try {
      const res = await axios.post("/api/v1/user/login", values);
      localStorage.setItem("token", res.data.token);
      if (res.data.success) {
        message.success("Login success");
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
      message.error("Something wrong");
    }
  };
  return (
    <>
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
    </>
  );
};

export default Login;
