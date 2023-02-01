import React from "react";
import { Link } from "react-router-dom";
import { BsGlobe } from "react-icons/bs";
import { FaUserCircle, FaBars } from "react-icons/fa";
import Dropdown from "react-bootstrap/Dropdown";
//css
import "../../assets/css/navbar.css";
import { getStorageJson, USER_LOGIN } from "../../util/config";

const Navbar = () => {
  const user = getStorageJson(USER_LOGIN);

  const signOut = () => {
    window.localStorage.clear();
    window.location.reload();
  };

  return (
    <section className="navBarSection">
      <header className="header flex justify-content-between container">
        <div className="logoDiv">
          <Link to="" className="logo flex">
            <img
              className="imageNav"
              src="https://links.papareact.com/qd3"
              alt=""
            />
          </Link>
        </div>
        <div className="navBar">
          <div className="flex">
            <p className="navBar-text">Enjoy</p>
            <BsGlobe className="icon" />
            <Dropdown align="end">
              <Dropdown.Toggle className="flex user bg-transparent ">
                <FaBars className="icon" />
                {!user?.avatar ? (
                  <FaUserCircle className="icon" />
                ) : (
                  <img className="avatar" src={user.avatar} />
                )}
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
      </header>
    </section>
  );
};

export default Navbar;
