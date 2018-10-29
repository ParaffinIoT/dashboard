import Link from "next/link";
import React from "react";
class SidebarHeader extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="header">
        <span
          style={{
            fontSize: 20,
            cursor: "pointer",
            color: "#ffff",
            float: "left"
          }}
        >
          &#9776;{" "}
        </span>

        <Link href="/">
          <a className="logo" />
        </Link>
        <Link href="/">
          <div className="version">
            <div>ParrafinIoT Dashboard</div>
          </div>
        </Link>
      </div>
    );
  }
}

export default SidebarHeader;
