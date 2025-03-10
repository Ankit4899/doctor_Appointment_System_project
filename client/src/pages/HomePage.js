import React,{useEffect,useState} from 'react'
import axios from 'axios'
import Layout from '../components/Layout';
import '@ant-design/v5-patch-for-react-19';
import {Row} from 'antd'
import DoctorList from '../components/DoctorList';
const HomePage = () => {
const [doctors,setDoctors] = useState([]);

  const getUserData=async ()=>{
      try{
        const res  = await axios.get('/api/v1/user/getAllDoctors',{
          headers:{
            Authorization:"Bearer " + localStorage.getItem('token')
          }
        });
        if(res.data.success){
          setDoctors(res.data.data);
        }
      }catch(err){
        console.log(err)
      }
  };

  useEffect(()=>{
    getUserData()
  },[]);
  return (
    <Layout>
        <h1 className='text-center'>Home page</h1>
        <Row>
{doctors && doctors.map(doctor => (
  <DoctorList doctor={doctor}/>
))}
        </Row>
    </Layout>
  )
}

export default HomePage