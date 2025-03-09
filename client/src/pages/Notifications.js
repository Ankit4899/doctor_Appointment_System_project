import React from "react";
import Layout from "../components/Layout";
import "@ant-design/v5-patch-for-react-19";
import { Tabs, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Notifications = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/get-all-notification",
        {
          userId: user._id,
        },
        {
          headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`,
          }
        }
        );
        dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("somthing went wrong");
    }
  };

  const handleDeleteAllRead = async () => {
    try{
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/delete-all-notification",
      {
        userId: user._id,
      },
      {
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`,
        }
      })
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    }catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("somthing went wrong");
    }
  };

  return (
    <Layout>
      <h4 className="text-center p-3 mt-3">All notifications</h4>

      <Tabs>
        <Tabs.TabPane tab="Unread" key={0}>
          <div className="d-flex justify-content-end">
            <h5 className="p-2 text-primary" style={{cursor:"pointer"}}  onClick={handleMarkAllRead}>
              Mark all as read
            </h5>
          </div>
          {user?.notification?.map((notificationMsg) => (
            <div className="card" style={{ cursor: "pointer" }}>
              <div
                className="card-text"
                onClick={() => navigate(notificationMsg.onClickPath)}
              >
                {notificationMsg.message}
              </div>
            </div>
          ))}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Read" key={1}>
          <div className="d-flex justify-content-end">
            <h5 className="p-2 text-primary" style={{cursor:"pointer"}} onClick={handleDeleteAllRead}>
              Delete all read
            </h5>
          </div>
          {user?.seenNotification?.map((notificationMsg) => (
            <div className="card" style={{ cursor: "pointer" }}>
              <div
                className="card-text"
                onClick={() => navigate(notificationMsg.onClickPath)}
              >
                {notificationMsg.message}
              </div>
            </div>
          ))}
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
};

export default Notifications;
