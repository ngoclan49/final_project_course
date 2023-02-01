
import { useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Layout, Drawer, Affix } from "antd";
import Sidenav from "../components/layout/Sidenav";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { getStorageJson, USER_LOGIN } from "../util/config";


const { Header: AntHeader, Content, Sider } = Layout;

function AdminTemplate() {
  // hiển thị / ẩn sidebar ở màn hình nhỏ
  const [visible, setVisible] = useState(false);
  const openDrawer = () => setVisible(!visible);

  // set màu cho sidenav icon 
  const [sidenavColor, setSidenavColor] = useState("#1890ff");

  // set kiểu cho sidenav icon 
  const [sidenavType, setSidenavType] = useState("transparent");

  // set header fixed
  const [fixed, setFixed] = useState(false);
  const handleSidenavType = (type: string) => setSidenavType(type);
  const handleSidenavColor = (color: string) => setSidenavColor(color);
  const handleFixedNavbar = (type: boolean) => setFixed(type);

  let { pathname } = useLocation();
  if (getStorageJson(USER_LOGIN)) {
    return (
      <Layout
        className={`layout-dashboard `}
      >
        {/* Sidebar in width >= 992px  */}
        <Drawer
          title={false}
          placement={'left'}
          closable={false}
          onClose={() => setVisible(false)}
          open={visible}
          key={'left'}
          width={250}
          className={`drawer-sidebar`}
        >
          <Layout
            className={`layout-dashboard`}
          >
            <Sider
              trigger={null}
              width={250}
              theme="light"
              className={`sider-primary ant-layout-sider-primary ${sidenavType === "#fff" ? "active-route" : ""
                }`}
              style={{ background: sidenavType }}
            >
              <Sidenav color={sidenavColor} />
            </Sider>
          </Layout>
        </Drawer>
        {/* Sidebar collapse - mobile view  */}
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
          trigger={null}
          width={250}
          theme="light"
          className={`sider-primary ant-layout-sider-primary ${sidenavType === "#fff" ? "active-route" : ""
            }`}
          style={{ background: sidenavType }}
        >
          <Sidenav color={sidenavColor} />
        </Sider>
        <Layout>
          {fixed ? (
            <Affix>
              <AntHeader className={`${fixed ? "ant-header-fixed" : ""}`}>
                <Header
                  onPress={openDrawer}
                  name={pathname}
                  subName={pathname}
                  handleSidenavColor={handleSidenavColor}
                  handleSidenavType={handleSidenavType}
                  handleFixedNavbar={handleFixedNavbar}
                />
              </AntHeader>
            </Affix>
          ) : (
            <AntHeader className={`${fixed ? "ant-header-fixed" : ""}`}>
              <Header
                onPress={openDrawer}
                name={pathname}
                subName={pathname}
                handleSidenavColor={handleSidenavColor}
                handleSidenavType={handleSidenavType}
                handleFixedNavbar={handleFixedNavbar}
              />
            </AntHeader>
          )}
          <Outlet />
          <Footer />
        </Layout>
      </Layout>
    );
  } else return <Navigate to={'/login'} />
}


export default AdminTemplate;
