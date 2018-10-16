import React from "react";
import SideBarHeader from "../Sidebar/SidebarHeader";
import FooterMenu from "../Sidebar/FooterMenu";
import HideFooterMenu from "../Sidebar/hidefootermenu";
import HideSideBarHeader from "../Sidebar/hide-sidebar-header";
import { Layout, Menu, Icon } from "antd";
import Link from "next/link";
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class SiderDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    };
    this.onCollapse = this.onCollapse.bind(this);
  }

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed: !this.state.collapsed });
  };

  render() {
    let sidebar = this.state.collapsed ? "sidebar2" : "sidebarLayout";
    let contentClass = this.state.collapsed ? "content4" : "content3";
    let HEADER = this.state.collapsed ? (
      <HideSideBarHeader callback={this.onCollapse} />
    ) : (
      <SideBarHeader callback={this.onCollapse} />
    );
    let FOOTER = this.state.collapsed ? <HideFooterMenu /> : <FooterMenu />;
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
          width="270"
          style={{ top: 0, left: 0, bottom: 0, position: "fixed" }}
        >
          {HEADER}
          <div className="logo" />
          <Menu
            theme="dark"
            defaultSelectedKeys={[this.props.defaultKey]}
            mode="inline"
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
          {FOOTER}
        </Sider>
        <Layout className={contentClass}>
          <Header style={{ background: "#fff", padding: 0 }} />
          <Content style={{ margin: "0 16px" }}>{this.props.children}</Content>
          <Footer style={{ textAlign: "center" }}>
            Paraffin IoT ©2018 Created by Paraffin IoT team
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
export default SiderDemo;
