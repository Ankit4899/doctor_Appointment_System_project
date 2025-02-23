import React,{useEffect} from 'react'
import axios from 'axios'
import Layout from '../components/Layout';
const HomePage = () => {
  const getUserData=async ()=>{
      try{
        const res  = await axios.post('/api/v1/user/getUserData',{},{
          headers:{
            Authorization:"Bearer " + localStorage.getItem('token')
          }
        })
      }catch(err){
        console.log(err)
      }
  };

  useEffect(()=>{
    getUserData()
  },[]);
  return (
    <Layout>
        <h1>Home page</h1>
    </Layout>
  )
}

export default HomePage