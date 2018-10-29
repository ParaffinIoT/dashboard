import React from "react";
import "../stylesheets/Sidebar.scss";
import "antd/dist/antd.css";
import Layout2 from "../components/Layout/layout2";
import { Breadcrumb } from "antd";
class option2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      iscollapsed: true
    };
  }

  render() {
    return (
      <Layout2 defaultKey="3">
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>
            <b style={{ fontStyle: "italic", fontWeight: "bold" }}>option2</b>{" "}
          </Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
          This place is option 2 page
        </div>
      </Layout2>
    );
  }
}
export default option2;
