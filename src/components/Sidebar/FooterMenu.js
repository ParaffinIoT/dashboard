import React from "react";
import "../../stylesheets/Sidebar.scss";

export default class FooterMenu extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="footer">
        <a target="_blank" href="https://github.com/ParaffinIoT">
          Open Source Hub
        </a>
        <a target="_blank" href="https://github.com/ParaffinIoT">
          GitHub
        </a>
        <a target="_blank" href="https://github.com/ParaffinIoT/doc">
          Docs
        </a>
      </div>
    );
  }
}
