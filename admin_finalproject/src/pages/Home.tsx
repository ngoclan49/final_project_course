import { useEffect, useState } from "react";

import { Card, Col, Row, Typography, Button, Timeline } from "antd";

import Paragraph from "antd/lib/typography/Paragraph";

import { cardDashboard } from "../assets/data/cardDashboard";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/configStore";

import logo from "../assets/images/profile.png";
import { useDispatch } from "react-redux";
import { getAllUsersApi } from "../redux/userReducer/userReducer";

import { makeStyle, styleGender } from "../assets/data/styleRole";
import "../assets/styles/home.css";
import { getAllLocationApi } from "../redux/locationReducer/locationReducer";
import { CiLocationOn } from 'react-icons/ci'
function Home() {
  const { users } = useSelector((state: RootState) => state.userReducer);
  const { locations } = useSelector((state: RootState) => state.locationReducer)
  const dispatch: AppDispatch = useDispatch();
  const { Title, Text } = Typography;


  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    dispatch(getAllUsersApi());
  }, []);

  useEffect(() => {
    dispatch(getAllLocationApi());
  }, []);

  return (
    <>
      <div className="layout-content">
        <Row className="rowgap-vbox" gutter={[24, 0]}>
          {cardDashboard.map((item, index) => (
            <Col
              key={index}
              xs={24}
              sm={24}
              md={24}
              lg={12}
              xl={8}
              className="mb-24"
            >
              <Card bordered={false} className="criclebox ">
                <div className="number">
                  <Row align="middle" gutter={[24, 0]}>
                    <Col xs={18}>
                      <span>{item.title}</span>
                      <Title level={3}>
                        {item.number}
                        <small className={item.bnb}>{item.persent}</small>
                      </Title>
                    </Col>
                    <Col xs={6}>
                      <div style={{ fontSize: "1rem" }} className="icon-box">
                        {<item.Icon />}
                      </div>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={16} className="mb-24">
            <Card bordered={false} className="criclebox cardbody h-full">
              <div className="project-ant">
                <div>
                  <Title level={5}>Users</Title>
                  <Paragraph className="lastweek">
                    new<span className="blue">users</span>
                  </Paragraph>
                </div>
              </div>
              <div className="ant-list-box table-responsive">
                <table className="width-100">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Gender</th>
                      <th>BirthDay</th>
                      <th>Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.slice(-6).map((user, index) => (
                      <tr key={index}>
                        <td>
                          <span>
                            <img
                              src={user.avatar ? user.avatar : logo}
                              alt=""
                              className="avatar-sm mr-10"
                            />
                            {user?.name}
                          </span>
                        </td>
                        <td>{user?.email}</td>
                        <td>
                          <span
                            style={styleGender(user.gender)}
                            className="userGender font-weight-bold"
                          >
                            {user?.gender === true ? "Male" : "Female"}
                          </span>
                        </td>
                        <td>
                          <div className="percent-progress">
                            {user?.birthday}
                          </div>
                        </td>
                        <td>
                          <div
                            style={makeStyle(user.role)}
                            className="userRole"
                          >
                            {user?.role.toUpperCase()}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={8} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <div className="timeline-box">
                <Title level={5}>Locations</Title>
                <Paragraph className="lastweek" style={{ marginBottom: 24 }}>
                  popular <span className="bnb2">location</span>
                </Paragraph>

                <Timeline
                  pending="Recording..."
                  className="timelinelist"
                  reverse={reverse}
                >
                  {locations.slice(0,6).map((location, index) => (
                    <Timeline.Item key={index}>
                      <Title level={5}><CiLocationOn/> {location.tenViTri}</Title>
                      <Text>{location.tinhThanh} - {location.quocGia}</Text>
                    </Timeline.Item>
                  ))}
                </Timeline>
                <Button
                  type="primary"
                  className="width-100"
                  onClick={() => setReverse(!reverse)}
                >
                  REVERSE
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Home;
