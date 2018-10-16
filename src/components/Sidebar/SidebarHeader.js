import Link from "next/link";
import React from "react";
class SidebarHeader extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="header">
        <Link className="logo" href="/">
          <a />
        </Link>
        <Link href="/">
          <div className="version">
            <div>ParrafinIoT Dashboard</div>
          </div>
        </Link>
        <span
          style={{
            fontSize: 20,
            cursor: "pointer",
            color: "#ffff",
            float: "right"
          }}
          onClick={() => this.props.callback(false)}
        >
          &#9776;{" "}
        </span>
      </div>
    );
  }
}

export default SidebarHeader;
