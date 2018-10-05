import React from "react";
import "../../stylesheets/Sidebar.scss";

function toggleSidebarExpansion() {
  if (document.body.className.indexOf(" expanded") > -1) {
    document.body.className = document.body.className.replace(" expanded", "");
  } else {
    document.body.className += " expanded";
  }
}

let SidebarToggle = () => (
  <a className="toggle" onClick={toggleSidebarExpansion}>
    <button>settings</button>
  </a>
);

export default SidebarToggle;
