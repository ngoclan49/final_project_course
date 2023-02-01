import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import Dropdown from "react-bootstrap/Dropdown";
//icon
import { BsGlobe } from "react-icons/bs";
import { FaUserCircle, FaBars } from "react-icons/fa";

//css
import "../../assets/css/header.css";
import BottomNavbar from "./BottomNavbar";
import MobileNavbar from "../MobileNavbar/MobileNavbar";
import HeaderComponent from "./HeaderComponent";
import { Link } from "react-router-dom";
import { getStorageJson, USER_LOGIN } from "../../util/config";
import { history } from "../..";

type Props = {};

const Header = (props: Props) => {
  const user = getStorageJson(USER_LOGIN);
  const signOut = () => {
    window.localStorage.clear();
    window.location.reload();
    history.push("/");
  };
  return (
    <div className="headerSection">
      <Link to={""} className="headerLogo">
        <img
          className="imageHeader"
          src="https://links.papareact.com/qd3"
          alt=""
        />
      </Link>
      <div className="searchBar">
        <HeaderComponent />
      </div>
      <div className="navBar">
        <div className="flex justify-content-center">
          <p style={{ color: "#909090" }} className="navBar-text mb-0">
            Enjoy
          </p>
          <BsGlobe
            style={{ fontSize: "20px", color: "#909090" }}
            className="icon mx-2"
          />
          <Dropdown align="end">
            <Dropdown.Toggle className="flex user bg-transparent ">
              <FaBars className="icon" />
              {!user?.avatar ? (
                <FaUserCircle className="icon" />
              ) : (
                <img className="avatar" src={user.avatar} />
              )}{" "}
            </Dropdown.Toggle>
            <Dropdown.Menu className="mt-2 dropDownMenu">
              {!user ? (
                <>
                  <Dropdown.Item className="dropDownItem">
                    <Link to="/login" className="linkAuth">
                      Log in
                    </Link>
                  </Dropdown.Item>
                </>
              ) : (
                <>
                  <Dropdown.Item className="dropDownItem" href="#/action-1">
                    Hello {user.name}
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={signOut}
                    className="dropDownItem"
                    href="#/action-1"
                  >
                    Log out
                  </Dropdown.Item>
                </>
              )}
              <Dropdown.Divider />
              {
                user ? (
                  <Dropdown.Item className="dropDownItem" href="#/action-3">
                    <Link to="/profile" className="linkAuth">
                      Go to profile
                    </Link>
                  </Dropdown.Item>
                ) : ''
              }
              <Dropdown.Item className="dropDownItem" href="#/action-4">
                Host an experience
              </Dropdown.Item>
              <Dropdown.Item className="dropDownItem" href="#/action-4">
                Help
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <MobileNavbar />

      <BottomNavbar />
    </div>
  );
};

export default Header;
