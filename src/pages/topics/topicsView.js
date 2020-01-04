import React from "react";
import {
  Grid,
  withStyles,
  Button,
  Modal,
  Fade,
  IconButton,
  Icon
} from "@material-ui/core";

import PageTitle from "../../components/PageTitle/PageTitle";
import Widget from "../../components/Widget/WidgetContainer";
import { Typography } from "../../components/Wrappers/Wrappers";
import Table from "../../components/TopicsTable/table";
import CloseIcon from "@material-ui/icons/Close";
import AddTopic from "../../components/add-topics";

const Topics = ({ classes, ...props }) => (
  <React.Fragment>
    <PageTitle
      title="Topics"
      button="Add Topic"
      onBtnClick={() => props.openAddTopic(true)}
    />
    <div>
      {props.client.adapters.map((value, index) => (
        <div style={{ marginTop: "40px" }}>
          <Typography>{value.type.toUpperCase()}</Typography>
          <Table data={value.topics} fn={props.deleteTopic}  clientData={props.client} adapter={value.type}/>
        </div>
      ))}
    </div>
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={props.isOpen}
      onClose={() => props.openAddTopic(false)}
      style={{
        alignItems: "center",
        justifyContent: "center",
        display: "flex"
      }}
    >
      <Fade in={props.isOpen}>
        <div>
          <div style={{ float: "right", marginRight: "10px" }}>
            <IconButton
              edge="end"
              aria-label="Close"
              onClick={() => props.openAddTopic(false)}
            >
              <CloseIcon />
            </IconButton>
          </div>
          <div className={classes.paper}>
            <AddTopic />
          </div>
        </div>
      </Fade>
    </Modal>
  </React.Fragment>
);

const styles = theme => ({
  dashedBorder: {
    border: "1px dashed",
    borderColor: theme.palette.primary.main,
    padding: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit * 4,
    marginTop: theme.spacing.unit
  },
  text: {
    marginBottom: theme.spacing.unit * 2
  },
  paper: {
    width: "90vw",
    maxWidth: "500px",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.customShadows.widgetDark,
    paddingBottom: theme.spacing.unit * 6,
    paddingLeft: theme.spacing.unit * 6,
    paddingRight: theme.spacing.unit * 6,
    top: `25%`,
    margin: "auto"
    // transform: `translate(-10%, -10%)`,
  }
});

export default withStyles(styles)(Topics);
