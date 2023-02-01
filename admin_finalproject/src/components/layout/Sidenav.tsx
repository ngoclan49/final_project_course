
import React from "react";
import { Menu} from "antd";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { RxDashboard } from 'react-icons/rx'
import { SiBuildkite } from 'react-icons/si'
import { AiOutlineUser, AiOutlineUsergroupDelete } from "react-icons/ai";
import { GoLocation } from "react-icons/go"

type Props = {
  color: string;
}

function Sidenav({color} : Props) {
  const { pathname } = useLocation();
  const page = pathname.replace("/", "");

  return (
    <>
      <div className="brand">
        <img src={logo} alt="" />
        <span>Admin Dashboard</span>
      </div>
      <hr />
      <Menu theme="light" mode="inline">
        <Menu.Item key="1">
          <NavLink to="/dashboard">
            <span
              className="icon"
              style={{
                background: page === "dashboard" ? color : "",
              }}
            >
              <RxDashboard />
            </span>
            <span className="label">Dashboard</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="2">
          <NavLink to="/rooms">
            <span
              className="icon"
              style={{
                background: page === "rooms" ? color : "",
              }}
            >
              <SiBuildkite />
            </span>
            <span className="label">Rooms</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="3">
          <NavLink to="/locations">
            <span
              className="icon"
              style={{
                background: page === "locations" ? color : "",
              }}
            >
              <GoLocation />
            </span>
            <span className="label">Locations</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="4">
          <NavLink to="/users">
            <span
              className="icon"
              style={{
                background: page === "users" ? color : "",
              }}
            >
              <AiOutlineUsergroupDelete />
            </span>
            <span className="label">Users</span>
          </NavLink>
        </Menu.Item>
        
        <Menu.Item className="menu-item-header" key="8">
          Account Pages
        </Menu.Item>
        <Menu.Item key="5">
          <NavLink to="/profile">
            <span
              className="icon"
              style={{
                background: page === "profile" ? color : "",
              }}
            >
              <AiOutlineUser />
            </span>
            <span className="label">Profile</span>
          </NavLink>
        </Menu.Item>
      </Menu>
    
    </>
  );
}

export default Sidenav;
