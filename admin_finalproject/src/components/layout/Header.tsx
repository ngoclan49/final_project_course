
// library
import { useState } from "react";
import {
  Row,
  Col,
  Breadcrumb,
  Button,
  Drawer,
  Typography,
  Switch,
} from "antd";

import { NavLink, Link } from "react-router-dom";
//icon 
import { AiOutlineSetting, AiOutlineMenu } from 'react-icons/ai'
import { FaUserCircle } from 'react-icons/fa'
//buttonContainer
import { ButtonContainer } from "../../assets/data/button";
//css 
import '../../assets/styles/header.css'
// config
import { getStorageJson, USER_LOGIN } from "../../util/config";

type Props = {
  name: string,
  subName: string,
  onPress: () => void,
  handleSidenavColor: (color: string) => void,
  handleSidenavType: (type: string) => void,
  handleFixedNavbar: (type: boolean) => void
}

function Header({
  name,
  subName,
  onPress,
  handleSidenavColor,
  handleSidenavType,
  handleFixedNavbar,
}: Props) {
  // destructuring 
  const { Title, Text } = Typography;

  // hide / show setting sidebar
  const [visible, setVisible] = useState(false);
  const [sidenavType, setSidenavType] = useState("transparent");

  const showDrawer = () => setVisible(true);
  const hideDrawer = () => setVisible(false);

  const renderLogin = () => {
    if (getStorageJson(USER_LOGIN)) {
      return (
        <Link to="/profile" className="btn-sign-in">
          <FaUserCircle />
          <span>{getStorageJson(USER_LOGIN).name}</span>
        </Link>
      )
    } else {
      return (
        <Link to="/login" className="btn-sign-in">
          <FaUserCircle />
          <span>Sign in</span>
        </Link>
      )
    }
  }
  return (
    <>
      <div className="setting-drwer" onClick={showDrawer}>
        <AiOutlineSetting />
      </div>
      <Row gutter={[24, 0]}>
        <Col span={24} md={6}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <NavLink to="/">Pages</NavLink>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              {/* loại bỏ /admin/ trong thuộc tính name */}
              {name.replace("/", "")}
            </Breadcrumb.Item>
          </Breadcrumb>
          <div className="ant-page-header-heading">
            <span
              className="ant-page-header-heading-title"
              style={{ textTransform: "capitalize" }}
            >
              {subName.replace("/", "")}
            </span>
          </div>
        </Col>
        <Col span={24} md={18} className="header-control">
          {/* button để hiển thị setting sidebar  */}
          <Button type="link" onClick={showDrawer}>
            <AiOutlineSetting />
          </Button>

          {/* button để hiển thị sidebar  */}
          <Button
            type="link"
            className="sidebar-toggler"
            onClick={() => onPress()}
          >
            <AiOutlineMenu />
          </Button>
          {/* Setting sidebar  */}
          <Drawer
            className="settings-drawer"
            mask={true}
            width={360}
            onClose={hideDrawer}
            placement={'right'}
            open={visible}
          >
            <div>
              <div className="header-top">
                <Title level={4}>
                  Configurator
                  <Text className="subtitle">See our dashboard options.</Text>
                </Title>
              </div>

              <div className="sidebar-color">
                <Title level={5}>Sidebar Color</Title>
                <div className="theme-color mb-2">
                  <ButtonContainer>
                    <Button
                      type="default"
                      className="buttonBlue"
                      onClick={() => handleSidenavColor("#1890ff")}
                    >
                      1
                    </Button>
                    <Button
                      type="default"
                      className="buttonGreen"
                      onClick={() => handleSidenavColor("#52c41a")}
                    >
                      1
                    </Button>
                    <Button
                      type='default'
                      className="buttonRed"
                      onClick={() => handleSidenavColor("#d9363e")}
                    >
                      1
                    </Button>
                    <Button
                      type='default'
                      className="buttonYellow"
                      onClick={() => handleSidenavColor("#fadb14")}
                    >
                      1
                    </Button>

                    <Button
                      type="default"
                      className="buttonBlack"
                      onClick={() => handleSidenavColor("#111")}
                    >
                      1
                    </Button>
                  </ButtonContainer>
                </div>

                <div className="sidebarnav-color mb-2">
                  <Title level={5}>Sidenav Type</Title>
                  <Text>Choose between 2 different sidenav types.</Text>
                  <ButtonContainer className="trans">
                    <Button
                      type={sidenavType === "transparent" ? "primary" : "default"}
                      onClick={() => {
                        handleSidenavType("transparent");
                        setSidenavType("transparent");
                      }}
                    >
                      TRANSPARENT
                    </Button>
                    <Button
                      type={sidenavType === "white" ? "primary" : "default"}
                      onClick={() => {
                        handleSidenavType("#fff");
                        setSidenavType("white");
                      }}
                    >
                      WHITE
                    </Button>
                  </ButtonContainer>
                </div>
                <div className="fixed-nav mb-2">
                  <Title level={5}>Navbar Fixed </Title>
                  <Switch onChange={(e) => handleFixedNavbar(e)} />
                </div>

              </div>
            </div>

            <div className="buttonSignOut">
              <button onClick={() => {
                window.localStorage.clear()
                window.location.reload()
              }}>Sign Out</button>
            </div>
          </Drawer>
          {renderLogin()}
        </Col>
      </Row>
    </>
  );
}

export default Header;

