import React from "react";
import { Form,Input,message } from "antd";
import "../styles/RegisterStyle.css";
import {Link,useNavigate} from 'react-router-dom';
import axios from 'axios';


const Register = () => {
const navigate = useNavigate();
    // Form handler
  const onFinishHandler = async (values) => {
    // console.log(values);
    try{
      const res = await axios.post('/api/v1/user/register',values);
      if(res.data.success){
        message.success("Registerd successfully");
        navigate('/login');
      }else{
        message.error(res.data.message);
      }
    }catch(err){
      console.log(err);
      message.error('something went wrong')
    }
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
            Register
          </button>
          <Link to='/login' className='m-2'>Already registered? Login</Link>
        </Form>
      </div>
    </>
  );
};

export default Register;
