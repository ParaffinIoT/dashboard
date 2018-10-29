import React from "react";
import { connect } from "react-redux";
import SideBarHeader from "../Sidebar/SidebarHeader";
import FooterMenu from "../Sidebar/FooterMenu";
import HideFooterMenu from "../Sidebar/hidefootermenu";
import HideSideBarHeader from "../Sidebar/hide-sidebar-header";
import MinSidebarHeader from "../Sidebar/minSidebarHeader";
import NosideBarHeader from "../Sidebar/Nosidebarheader";
import ContentHeader from "../header/header";
import { sidebarCollapse } from "../../redux/reducersAndActions/sidebarState";
import { Layout, Avatar, Input, Badge, Icon } from "antd";
import Menus from "../menus/menus";
const { Header, Content, Footer } = Layout;
const Search = Input.Search;
class SiderDemo extends React.Component {
  constructor(props) {
    super(props);
    this.onCollapse = this.onCollapse.bind(this);
  }

  onCollapse = collapsed => {
    this.props.sidebarCollapse(!this.props.collapsed.collapsed);
  };

  render() {
    let sidebar = this.props.collapsed.collapsed ? "sidebar2" : "sidebarLayout";
    let contentClass = this.props.collapsed.collapsed ? "content4" : "content3";
    let HEADER = this.props.collapsed.collapsed ? (
      <HideSideBarHeader callback={this.onCollapse} />
    ) : (
      <SideBarHeader callback={this.onCollapse} />
    );
    let FOOTER = this.props.collapsed.collapsed ? (
      <HideFooterMenu />
    ) : (
      <FooterMenu />
    );

    let minSidebarDisplay = this.props.minCollapse.minCollapse
      ? "none"
      : "block";
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <div className={sidebar}>
          {HEADER}
          <div className="logo" />
          <Menus
            defaultKey={this.props.defaultKey}
            incollapsed={this.props.collapsed.collapsed}
          />
          {FOOTER}
        </div>
        <div className="minSidebar sidebar2">
          <MinSidebarHeader />
          <div className="logo" />
          <Menus defaultKey={this.props.defaultKey} incollapsed={true} />
          <HideFooterMenu />
        </div>

        <Layout className={contentClass}>
          <ContentHeader />
          <div className="noSideBarHeader">
            <NosideBarHeader />
          </div>
          <Content style={{ margin: "0 16px" }}>{this.props.children}</Content>
          <Footer style={{ textAlign: "center" }}>
            Paraffin IoT ©2018 Created by Paraffin IoT team
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  collapsed: state.sidebarCollapseReducer,
  minCollapse: state.minSidebarCollapseReducer
});
const mapDispatchToProps = {
  sidebarCollapse
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SiderDemo);
