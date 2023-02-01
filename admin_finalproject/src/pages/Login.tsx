// library 
import React from "react";
import { Link } from "react-router-dom";
import {
  Layout,
  Menu,
  Button,
  Row,
  Col,
  Typography,
} from "antd";
import signinbg from "../assets/images/img-signin.jpg";
import { VscSignIn } from "react-icons/vsc";
import { AiOutlineDashboard, AiOutlineCalendar } from "react-icons/ai";
import {
  FaPinterestP,
  FaFacebookF,
  FaYoutube,
  FaInstagram,
  FaGithub,
} from "react-icons/fa";
import * as Yup from "yup";
import { AppDispatch } from "../redux/configStore";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { loginApi } from "../redux/userReducer/userReducer";
import { LoginModel } from "../Models/UserModel";
import '../assets/styles/login.css'
const { Title } = Typography;
const { Header, Footer, Content } = Layout;
const Login = () => {
  const dispatch: AppDispatch = useDispatch();
  const formik = useFormik<LoginModel>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        await dispatch(loginApi(values))
        
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <>
      <Layout className="layout-default layout-signin">
        <Header style={{ display: "flex", alignItems: "center" }}>
          <div className="header-col header-nav">
            <Menu mode="horizontal" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1">
                <Link to="/admin/dashboard">
                  <AiOutlineDashboard />
                  <span style={{ fontWeight: "bold" }}> Dashboard</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/admin/sign-up">
                  <AiOutlineCalendar />
                  <span style={{ fontWeight: "bold" }}> Sign Up</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to="/sign-in">
                  <VscSignIn />
                  <span style={{ fontWeight: "bold" }}> Sign In</span>
                </Link>
              </Menu.Item>
            </Menu>
          </div>
        </Header>
        <Content className="signin">
          <Row gutter={[24, 0]} justify="space-around">
            <Col
              xs={{ span: 24, offset: 0 }}
              lg={{ span: 6, offset: 2 }}
              md={{ span: 12 }}
            >
              <Title className="mb-15">Sign In</Title>
              <Title className="font-regular text-muted" level={5}>
                Enter your email and password to sign in
              </Title>
              <form
                style={{ fontWeight: "bold" }}
                className="form"
                onSubmit={formik.handleSubmit}
              >
                  <div className="loginItem">
                    <input
                      className="swing"
                      id="email"
                      type="text"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder='Enter your email address'
                    />
                    <label htmlFor="email">Email</label>
                  </div>

                  <div className="loginItem">
                    <input
                      className="swing"
                      id="password"
                      type="password"
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder='Enter your password'
                    />
                    <label htmlFor="password">Password</label>
                  </div>

                <div className="loginItem">
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: "100%" }}
                  >
                    SIGN IN
                  </Button>
                </div>
                <p className="font-semibold text-muted">
                  Don't have an account?{" "}
                  <Link to="/sign-up" className="text-dark font-bold">
                    Sign Up
                  </Link>
                </p>
              </form>
            </Col>
            <Col
              className="sign-img"
              style={{ padding: 12 }}
              xs={{ span: 24 }}
              lg={{ span: 12 }}
              md={{ span: 12 }}
            >
              <img src={signinbg} alt="" />
            </Col>
          </Row>
        </Content>
        <Footer>
          <Menu mode="horizontal">
            <Menu.Item key={1}>Company</Menu.Item>
            <Menu.Item key={2}>About Us</Menu.Item>
            <Menu.Item key={3}>Teams</Menu.Item>
            <Menu.Item key={4}>Products</Menu.Item>
            <Menu.Item key={5}>Blogs</Menu.Item>
            <Menu.Item key={6}>Pricing</Menu.Item>
          </Menu>
          <Menu mode="horizontal" className="menu-nav-social">
            <Menu.Item key={7}>
              <Link to="#">
                <FaPinterestP />
              </Link>
            </Menu.Item>
            <Menu.Item key={8}>
              <Link to="#">
                <FaFacebookF />
              </Link>
            </Menu.Item>
            <Menu.Item key={9}>
              <Link to="#">
                <FaYoutube />
              </Link>
            </Menu.Item>
            <Menu.Item key={10}>
              <Link to="#">
                <FaInstagram />
              </Link>
            </Menu.Item>
            <Menu.Item key={11}>
              <Link to="#">{<FaGithub />}</Link>
            </Menu.Item>
          </Menu>
          <p className="copyright">
            Copyright © 2022 by <a href="#pablo">Minh Thu</a>.{" "}
          </p>
        </Footer>
      </Layout>
    </>
  );
};

export default Login;
