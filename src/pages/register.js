import { Component } from "react";
import RegisterCompoent from "../components/auth/register";
import Header from "../components/header/header";
import NosideBarHeader from "../components/Sidebar/Nosidebarheader";
import "../stylesheets/auth.scss";
import { Row, Col } from "antd";
export default () => {
  return (
    <div className="register-pg">
      <Header />
      <div className="noSideBarHeader">
        <NosideBarHeader />
      </div>
      <div className="signup-title">Register Now</div>
      <Row>
        <Col
          span={12}
          offset={4}
          style={{
            boxShadow: "6px 6px 5px #e6e6e6",

            paddingRight: "10px",
            paddingTop: "10px",
            paddingLeft: "-10px"
          }}
        >
          <RegisterCompoent />
        </Col>
      </Row>
    </div>
  );
};
