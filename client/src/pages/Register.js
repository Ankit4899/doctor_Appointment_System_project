import React from "react";
import { Form,Input } from "antd";
import "../styles/RegisterStyle.css";
import {Link} from 'react-router-dom';

const Register = () => {

    // Form handler
  const onFinishHandler = (values) => {
    console.log(values);
  };
  return (
    <>
      <div className="form-container">
        <Form layout="vertical" onFinish={onFinishHandler} className="register-form">
          <h1 className="text-center">User Registeration</h1>
          <Form.Item label="Name" name="name">
            <Input type="text" required />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="text" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>
          <button className="btn btn-primary" type="submit">
            Login
          </button>
          <Link to='/login' className='m-2'>Already registered? Login</Link>
        </Form>
      </div>
    </>
  );
};

export default Register;
