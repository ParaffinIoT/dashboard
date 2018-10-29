import { Component } from "react";
import Link from "next/link";
import { Menu, Icon } from "antd";
const { SubMenu } = Menu;
class Menus extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Menu
        theme="dark"
        defaultSelectedKeys={[this.props.defaultKey]}
        mode="inline"
        inlineCollapsed={this.props.incollapsed}
      >
        <Menu.Item key="1">
          <Link href="/layout2">
            <a>
              <Icon type="pie-chart" />
              <span>Home</span>
            </a>
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link href="/option1">
            <a>
              <Icon type="pie-chart" />
              <span>Option 1</span>
            </a>
          </Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link href="/option2">
            <a>
              <Icon type="desktop" />
              <span>Option 2</span>
            </a>
          </Link>
        </Menu.Item>
        <SubMenu
          key="sub1"
          title={
            <span>
              <Icon type="user" />
              <span>User</span>
            </span>
          }
        >
          <Menu.Item key="4">Tom</Menu.Item>
          <Menu.Item key="5">Bill</Menu.Item>
          <Menu.Item key="6">Alex</Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub2"
          title={
            <span>
              <Icon type="team" />
              <span>Team</span>
            </span>
          }
        >
          <Menu.Item key="6">Team 1</Menu.Item>
          <Menu.Item key="8">Team 2</Menu.Item>
        </SubMenu>
        <Menu.Item key="9">
          <Icon type="file" />
          <span>File</span>
        </Menu.Item>
      </Menu>
    );
  }
}

export default Menus;
