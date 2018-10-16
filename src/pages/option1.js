import React from "react";
import "../stylesheets/Sidebar.scss";
import "antd/dist/antd.css";
import Layout2 from "../components/Layout/layout2";
import { Breadcrumb } from "antd";
class option1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    };
  }

  render() {
    return (
      <Layout2 defaultKey="2">
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>option1</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
          This place is option 1 page
        </div>
      </Layout2>
    );
  }
}
export default option1;
