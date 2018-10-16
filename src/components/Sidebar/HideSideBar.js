import React from "react";
import HideSideBarFooter from "../Sidebar/hidefootermenu";
class SidebarHeader2 extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div className="header">
          <span
            style={{
              fontSize: 30,
              cursor: "pointer",
              color: "#ffff",
              float: "right"
            }}
            onClick={() => this.props.callback(true)}
          >
            &#9776;{" "}
          </span>
        </div>
        <div id="cssmenu">
          <ul>
            <li>
              <a href="#">
                <span style={{ fontSize: "30px", marginRight: "8px" }}>
                  {" "}
                  &#9962;{" "}
                </span>
              </a>
            </li>
            <li>
              <a href="#">
                <span style={{ fontSize: "30px", marginRight: "8px" }}>
                  {" "}
                  &#9738;{" "}
                </span>
              </a>
            </li>
            <li>
              <a href="#">
                <span style={{ fontSize: "30px", marginRight: "8px" }}>
                  {" "}
                  &#9746;{" "}
                </span>
              </a>
            </li>
            <li>
              <a href="#">
                <span style={{ fontSize: "30px", marginRight: "8px" }}>
                  {" "}
                  &#9881;{" "}
                </span>
              </a>
            </li>
          </ul>
        </div>
        <HideSideBarFooter />
      </div>
    );
  }
}

export default SidebarHeader2;
