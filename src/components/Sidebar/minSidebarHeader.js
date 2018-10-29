import { Component } from "react";
import { connect } from "react-redux";
import { minSidebarCollapse } from "../../redux/reducersAndActions/sidebarState";
class HideSideBarHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hide: false
    };
    this.hideSideBar = this.hideSideBar.bind(this);
  }
  hideSideBar() {
    this.setState({ hide: !this.state.hide });
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
          onClick={() => {
            this.props.minSidebarCollapse(!this.props.minCollapse.minCollapse);
          }}
        >
          &#9776;{" "}
        </span>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  minCollapse: state.minSidebarCollapseReducer
});
const mapDispatchToProps = {
  minSidebarCollapse
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HideSideBarHeader);
