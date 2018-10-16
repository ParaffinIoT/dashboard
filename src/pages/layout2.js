import React from "react";
import "../stylesheets/Sidebar.scss";
import "antd/dist/antd.css";
import Layout2 from "../components/Layout/layout2";
class SiderDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    };
  }

  render() {
    return (
      <Layout2>
        <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
          Bill is a cat.
        </div>
      </Layout2>
    );
  }
}
export default SiderDemo;
