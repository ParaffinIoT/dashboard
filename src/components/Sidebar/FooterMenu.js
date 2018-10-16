import React from "react";
import "../../stylesheets/Sidebar.scss";
import { Menu, Dropdown, Icon } from "antd";

const SubMenu = Menu.SubMenu;

const menu = (
  <Menu style={{ width: "100px" }}>
    <Menu.Item>Profile</Menu.Item>
    <Menu.Item>Settings</Menu.Item>
    <SubMenu title="Things">
      <Menu.Item>Things item</Menu.Item>
      <Menu.Item>Things item</Menu.Item>
    </SubMenu>
    <Menu.Item>Logout</Menu.Item>
  </Menu>
);

export default class FooterMenu extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="footer">
        <a target="_blank" href="https://github.com/ParaffinIoT">
          Hub
        </a>
        <a target="_blank" href="https://github.com/ParaffinIoT">
          GitHub
        </a>
        <a target="_blank" href="https://github.com/ParaffinIoT/doc">
          Docs
        </a>
        <Dropdown overlay={menu} trigger={["click"]}>
          <a className="ant-dropdown-link" href="#">
            <Icon
              type="ellipsis"
              theme="outlined"
              style={{ transform: "rotate(90deg)", fontSize: "20px" }}
            />{" "}
          </a>
        </Dropdown>
      </div>
    );
  }
}
