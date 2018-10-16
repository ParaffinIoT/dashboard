import React from "react";
import "../stylesheets/Sidebar.scss";
import "antd/dist/antd.css";
import Layout2 from "../components/Layout/layout2";
import { Breadcrumb } from "antd";
class SiderDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    };
  }

  render() {
    return (
      <Layout2 defaultKey="1">
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
          This is a homepage.
        </div>
      </Layout2>
    );
  }
}
export default SiderDemo;
