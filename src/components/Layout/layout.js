import { Component } from "react";
import SideBarHeader from "../Sidebar/SidebarHeader";
import SideBarHeader2 from "../Sidebar/HideSideBar";
import SideBarSection from "../Sidebar/SidebarSectiont";
import SidebarToggle from "../Sidebar/SidebarToggle";
import SideBarFooter from "../Sidebar/FooterMenu";
import Menus from "../menus/menus";
import "../../stylesheets/Dashboard.scss";
class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true
    };
    this.toggle = this.toggle.bind(this);
  }
  toggle(params) {
    this.setState({ isOpen: params });
    console.log(this.state.isOpen);
  }

  render() {
    let seachBarMargin = this.state.isOpen ? "230px" : "50px";
    let contentClass = this.state.isOpen ? "content" : "content2";
    let CurrentSideBarSection = this.state.isOpen ? (
      <div className="sidebar">
        <SideBarHeader callback={this.toggle} />
        <Menus />
        <SideBarFooter />
      </div>
    ) : (
      <div className="sidebar2">
        <SideBarHeader2 callback={this.toggle} />
      </div>
    );

    return (
      <div className="dashboard">
        <div className="topnav" style={{ marginLeft: seachBarMargin }}>
          <input
            type="text"
            placeholder="Search.."
            style={{ marginTop: "15px" }}
          />
        </div>
        <div className={contentClass}>
          <h1>Hello</h1>
        </div>
        <div className="sidebar">
          <SideBarHeader callback={this.toggle} />
          <Menus />
        </div>

        <SidebarToggle />
      </div>
    );
  }
}
export default Layout;
