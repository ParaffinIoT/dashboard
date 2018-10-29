import { Badge, Layout, Input, Icon, Avatar } from "antd";
const { Header } = Layout;
const Search = Input.Search;
const ContentHeader = () => {
  return (
    <div className="contentHeader">
      <Header style={{ background: "#fafdff", padding: 0 }}>
        <div className="topnav">
          <div style={{ float: "left", width: "60%", marginLeft: "4%" }}>
            <Search
              style={{ width: "90%" }}
              placeholder="input search text"
              onSearch={value => console.log(value)}
            />
          </div>
          <div
            style={{
              float: "left",
              marginLeft: "8%",
              width: "10%",
              height: "inherit",
              marginTop: "9px"
            }}
          >
            {" "}
            <Badge count={1000} overflowCount={999}>
              <Icon
                type="message"
                style={{ color: "#ffffff", fontSize: "25px" }}
              />
            </Badge>
          </div>
          <div
            style={{
              float: "left",
              width: "10%",
              height: "inherit",
              marginTop: "9px"
            }}
          >
            {" "}
            <Badge count={1000} overflowCount={999}>
              <Icon
                type="notification"
                style={{ color: "#ffffff", fontSize: "25px" }}
              />
            </Badge>
          </div>
          <div style={{ float: "right", marginRight: "2%" }}>
            <Avatar size="large" icon="user" />
          </div>
        </div>
      </Header>
    </div>
  );
};

export default ContentHeader;
