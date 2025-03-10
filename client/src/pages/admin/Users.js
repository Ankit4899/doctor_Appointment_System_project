import React,{useState,useEffect} from 'react'
import Layout from "../../components/Layout";
import axios from 'axios'
import '@ant-design/v5-patch-for-react-19';
import {Table} from 'antd'
const Users = () => {
const [users,setUsers] = useState([])
//get users
const getUsers = async()=>{
try{
const res = await axios.get('/api/v1/admin/getAllUsers',{
  headers:{
     Authorization:`Bearer ${localStorage.getItem("token")}`
  }
})
if(res.data.success){
  setUsers(res.data.data);
}
}catch(error){
  console.log(error);

}
}

useEffect(()=>{
  getUsers()
},[])

const columns = [
  {
    title:'Name',
    dataIndex:'name',
  },{
    title:'Email',
    dataIndex:'email'
  },
  {
    title:'Doctor',
    dataIndex:'isDoctor',
    render:(text,record)=>(
      <span>{record.isDoctor?'YES':'NO'}</span>
    )
  },
  {
    title:'Actions',
    dataIndex:'actions',
    render:(text,record)=>(
      <div className="d-flex">
        <button className="btn btn-danger">Block</button>
      </div>
    )
  }
]
  return (
    <Layout>
        <h1 className='text-center'>All Users</h1>
        <Table  columns={columns} dataSource={users}/>
    </Layout>
  )
}

export default Users