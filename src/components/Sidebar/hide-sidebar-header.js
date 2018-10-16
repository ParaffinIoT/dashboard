import { Component } from "react";
class HideSideBarHeader extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="header" style={{ width: 80 }}>
        <span
          style={{
            fontSize: 20,
            cursor: "pointer",
            color: "#ffff",
            float: "right"
          }}
          onClick={() => this.props.callback(true)}
        >
          &#9776;{" "}
        </span>
      </div>
    );
  }
}
export default HideSideBarHeader;
