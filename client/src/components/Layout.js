import React from "react";
import "../styles/layout.css";
import { adminMenu, userMenu } from "./../data/data";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "@ant-design/v5-patch-for-react-19";
import { message, Badge, Avatar, ConfigProvider } from "antd";
const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  // logout funtion
  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout Successfully");
    navigate("/login");
  };




// doctor Menu
 const doctorMenu = [
  {
    name: "Home",
    path: "/",
    icon: "fa-solid fa-house",
  },
  {
    name: "Appointments",
    path: "/appointments",
    icon: "fa-solid fa-list",
  },
  {
    name: "Profile",
    path: `/doctor/profile/${user?._id}`,
    icon: "fa-solid fa-user",
  },
];




  // redering menu list
  const SidebarMenu = user?.isAdmin ? adminMenu : user?.isDoctor ? doctorMenu : userMenu;
  return (
    <>
      <div className="main">
        <div className="layout">
          <div className="sidebar">
            <div className="logo">
              <h2>DOC APP</h2>
              <hr />
            </div>
            <div className="menu">
              {SidebarMenu.map((menu) => {
                const isActive = location.pathname === menu.path;
                return (
                  <>
                    <div className={`menu-item ${isActive && "active"}`}>
                      <i className={menu.icon}></i>
                      <Link to={menu.path}>{menu.name}</Link>
                    </div>
                  </>
                );
              })}
              <div className={`menu-item `} onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket"></i>
                <Link to="/login">Logout</Link>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="header">
              <div className="header-content" style={{ cursor: "pointer" }}>
                <div
                  className="badge-container"
                  onClick={() => navigate("/notification")}
                >
                  <ConfigProvider>
                    <Badge
                      count={user?.notification.length ?? 0}
                      style={{ cursor: "pointer" }}
                    >
                      <Avatar shape="square" size="large" />
                    </Badge>
                  </ConfigProvider>
                  <i className="fa-solid fa-bell"></i>
                </div>
                <Link to="/profile">Hi, {user?.name}</Link>
              </div>
            </div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
