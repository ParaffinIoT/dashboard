import React from "react";
import "../stylesheets/Sidebar.scss";
import "antd/dist/antd.css";
import Layout2 from "../components/Layout/layout2";
import { Breadcrumb } from "antd";
class SiderDemo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Layout2 defaultKey="1">
        <Breadcrumb style={{ margin: "16px 0", background: "#fafafa" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
          <h1 className="heading">Page title</h1>
        </div>
      </Layout2>
    );
  }
}
export default SiderDemo;
