import React, { Fragment } from "react";
import "date-fns";
import Header from "../../components/Header/HeaderContainer";
import {
  Grid,
  Typography,
  withStyles,
  Button,
  TextField,
  CircularProgress,
  Fade
} from "@material-ui/core";
import NotificationCustomComponent from "../../components/Notification";
import classnames from "classnames";

const AddClient = ({ classes, ...props }) => {
  return (
    <Fragment>
      {/* <Header /> */}
      <Grid container className={classes.container}>
        <div style={{ position: "relative", marginTop: "40px" }}>
          <Fade in={!props.error}>
            <Typography color="secondary" className={classes.errorMessage}>
              {props.errorMsg}
            </Typography>
          </Fade>
          {props.isSuccess && (
            <NotificationCustomComponent
              className={classes.notificationItem}
              shadowless
              type="customer"
              message="New client added"
              variant="contained"
              color="success"
            />
          )}
          <div>
            <Typography
              variant="h4"
              color="primary"
              className={classnames(classes.textRow)}
            >
              {props.adapterClientName ? "Add New Adapter" : " Add New Client"}
            </Typography>
            <div style={{ width: "400px" }}>
              <TextField
                required
                id="standard-required"
                label="Required"
                placeholder="Client Name"
                value={props.clientName}
                onChange={(e)=>props.setClientName(e.target.value)
                }
                fullWidth
                InputLabelProps={{
                  shrink: true
                }}
              />
              <TextField
                className={classnames(classes.textField)}
                required
                id="standard-required"
                label="Required"
                placeholder="Version"
                value={props.version}
                onChange={(e)=>props.setVersion(e.target.value)}
                fullWidth
                InputLabelProps={{
                  shrink: true
                }}
              />
            </div>
            {props.isLoading ? (
              <CircularProgress size={26} />
            ) : (
              <Button
                style={{ marginTop: "25px" }}
                variant="contained"
                color="primary"
                size="small"
                className={classes.backButton}
                onClick={props.handleAddClientButtonClick}
                disabled={!props.clientName || !props.version}
              >
                Add Client
              </Button>
            )}
          </div>
        </div>
      </Grid>
    </Fragment>
  );
};

const styles = theme => ({
  textRow: {
    marginBottom: theme.spacing.unit * 3,
    textAlign: "center"
  },

  backButton: {
    boxShadow: theme.customShadows.widget,
    textTransform: "none",
    fontSize: "1rem"
  },
  textField: {
    borderBottomColor: theme.palette.background.light
  },
  grid: {
    display: "flex",
    justifyContent: "space-between"
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: 2
  },
  errorMessage: {
    textAlign: "center"
  },
  notificationItem: {
    marginBottom: theme.spacing.unit * 3,
    width: "100%"
  },
  textField: {
    marginTop: theme.spacing.unit * 3
  }
});

export default withStyles(styles, { withTheme: true })(AddClient);
