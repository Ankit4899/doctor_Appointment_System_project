import React from 'react'
import { Form,Input } from "antd";
import "../styles/LoginStyle.css";
import {Link} from 'react-router-dom';

const Login = () => {

  // Form handler
  const onFinishHandler = (values) => {
    console.log(values);
  };
  return (
    <>
    <div className="form-container">
      <Form layout="vertical" onFinish={onFinishHandler} className="register-form">
        <h1 className="text-center">User Login</h1>
        
        <Form.Item label="Email" name="email">
          <Input type="text" required />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type="password" required />
        </Form.Item>
        <button className="btn btn-primary" type="submit">
          Register
        </button>
        <Link to='/register' className='m-2'>New User? Register</Link>
      </Form>
    </div>
  </>
  )
}

export default Login