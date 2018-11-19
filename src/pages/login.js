import { Component } from "react";
import { Row, Col } from "antd";
import "../stylesheets/auth.scss";
import LoginComponent from "../components/auth/login";
import Header from "../components/header/header";
import NosideBarHeader from "../components/Sidebar/Nosidebarheader";
class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="login-pg" >
        <Header />
        <div className="noSideBarHeader">
          <NosideBarHeader />
        </div>
        <div className="signup-title">Sign In</div>
        <Row>
          <Col
            span={6}
            offset={9}
            style={{
              boxShadow: "6px 6px 5px #e6e6e6",

              padding: "10px"
            }}
            className="float"
          >
            <LoginComponent />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Login;
