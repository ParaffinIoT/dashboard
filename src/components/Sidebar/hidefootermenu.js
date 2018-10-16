import React from "react";
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

class HideFooterMenu extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="footer">
        <Dropdown overlay={menu} trigger={["click"]}>
          <a className="ant-dropdown-link" href="#">
            <Icon
              type="ellipsis"
              theme="outlined"
              style={{ fontSize: "20px" }}
            />{" "}
          </a>
        </Dropdown>
      </div>
    );
  }
}
export default HideFooterMenu;
