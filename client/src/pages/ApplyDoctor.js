import React from "react";
import Layout from "../components/Layout";
import '@ant-design/v5-patch-for-react-19';
import { Col, Form, Input, Row, TimePicker ,message,Badge} from "antd";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {showLoading,hideLoading} from '../redux/features/alertSlice'
import axios from 'axios'



const ApplyDoctor = () => {
const {user} = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleFinish = async (values) => {
    // console.log(values);
    try{
dispatch(showLoading());
const res = await axios.post('/api/v1/user/apply-doctor',{...values,userId:user._id},{
  headers:{
    Authorization:`Bearer ${localStorage.getItem('token')}`,
  }
})
dispatch(hideLoading());
if(res.data.success){
  message.success(res.data.success)
  navigate('/')
}else{
  message.error(res.data.success)
}


    }catch(err){
      dispatch(hideLoading());
      console.log(err);
      message.error("something went wrong")
    }
  };
  return (
    <Layout>
      <h1 className="text-center">Apply doctor</h1>
      <Form layout="vertical" onFinish={handleFinish} className="m-3">
        <h4 className="">Personal details:</h4>
        <Row gutter={15}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="First name"
              name="firstName"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Your name" />
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Last name"
              name="lastName"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Your name" />
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Phone"
              name="phone"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Your phone number" />
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Email"
              name="email"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Your email id" />
            </Form.Item>
          </Col>

          {/* <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Website"
              name="website"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Your website" />
            </Form.Item>
          </Col> */}

          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Address"
              name="address"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Your address" />
            </Form.Item>
          </Col>
        </Row>

        <h4 className="">Professional details:</h4>
        <Row gutter={15}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Specialization"
              name="specialization"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Your specialization" />
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Experience"
              name="experience"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Your experience" />
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Fee"
              name="fee"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Your fee" />
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Timings"
              name="timings"
              required
              rules={[{ required: true }]}
            >
              <TimePicker.RangePicker format="HH:mm"/>
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}></Col>
          <Col xs={24} md={24} lg={8}>
          <div className="d-flex justify-content-end">
            <button className="btn btn-primary form-btn" type="submit">Submit</button>
        </div>
          </Col>
        </Row>
        
      </Form>
    </Layout>
  );
};

export default ApplyDoctor;
