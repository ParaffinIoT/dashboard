import React from "react";
import {
  Grid,
  withStyles,
  CssBaseline,
  Button,
  Icon,
  Modal
} from "@material-ui/core";
import Widget from "../../components/Widget";
import PageTitle from "../../components/PageTitle";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import { red, blue } from "@material-ui/core/colors";
import AddClient from "../../components/add-client";
import Chip from "@material-ui/core/Chip";
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const Dashboard = ({ classes, theme, client, history, ...props }) => {
  const [open, setOpen] = React.useState(false);
  const [clientName, setClientName] = React.useState(null);
  const [modalStyle] = React.useState(getModalStyle);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <Header />

      <div style={{ marginTop: "90px", marginLeft: "2%", marginRight: "2%" }}>
        <PageTitle title="Clients" />
      </div>
      <div className={classes.content}>
        {client.user_clients.length > 0 && (
          <Grid container spacing={4}>
            <Grid item lg={3} md={4} sm={6} xs={12}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  height: "100%",
                  width: "100%"
                }}
              >
                <Icon
                  className={classes.iconHover}
                  color="disabled"
                  style={{ fontSize: 90 }}
                  onClick={() => {
                    handleOpen();
                    setClientName("");
                  }}
                >
                  add_circle
                </Icon>
                <span>Add New Client</span>
              </div>
            </Grid>
            {client.user_clients.map((value, index) => {
              return (
                <Grid item lg={3} md={4} sm={6} xs={12} key={index}>
                  <Widget
                    title={value.id && value.get("clientName")}
                    upperTitle
                    className={classes.card}
                    bodyClass={classes.fullHeightBody}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexFlow: "row wrap",
                        marginTop: "20px"
                      }}
                    >
                      {value.id &&
                        value
                          .get("adapters")
                          .map((val, i) => (
                            <Chip
                              size="small"
                              label={val.type}
                              className={classes.chip}
                              color="secondary"
                            />
                          ))}
                    </div>

                    <div className={classes.btnContainer}>
                      <Button
                        variant="contained"
                        color="default"
                        size="small"
                        disabled={
                          value.id && value.get("adapters").length === 3
                        }
                        className={classes.forgetButton}
                        onClick={() => {
                          handleOpen();
                          setClientName(value.get("clientName"));
                        }}
                      >
                        Add Adapter
                      </Button>

                      <Button
                        component={Link}
                        to={`clients/dashboard/${value.id}`}
                        color="primary"
                        size="large"
                        className={classes.forgetButton}
                        onClick={() => props.handleSetClient(value.id)}
                      >
                        Select
                      </Button>
                    </div>
                  </Widget>
                </Grid>
              );
            })}
          </Grid>
        )}

        {client.user_clients.length === 0 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column"
            }}
          >
            <h3>You haven't added any client yet</h3>
            <Grid item lg={3} md={4} sm={6} xs={12}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  height: "100%",
                  width: "100%"
                }}
              >
                <Icon
                  className={classes.iconHover}
                  color="disabled"
                  style={{ fontSize: 90 }}
                  onClick={() => {
                    handleOpen();
                    setClientName("");
                  }}
                >
                  add_circle
                </Icon>
                <span>Add New Client</span>
              </div>
            </Grid>
          </div>
        )}
      </div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
        style={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex"
        }}
      >
        <div className={classes.paper}>
          <AddClient adapterClientName={clientName} />
        </div>
      </Modal>
    </React.Fragment>
  );
};

const styles = theme => ({
  content: {
    paddingTop: theme.spacing.unit * 1,
    padding: theme.spacing.unit * 3,
    maxWidth: "90%",
    marginLeft: "auto",
    marginRight: "auto"
  },
  card: {
    minHeight: "100%"
  },
  fullHeightBody: {
    height: "23vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  btnContainer: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between"
  },

  forgetButton: {
    textTransform: "none",
    fontWeight: 400
  },
  version: {
    paddingBottom: "15px"
  },
  icon: {
    margin: theme.spacing(2)
  },
  iconHover: {
    margin: theme.spacing(2),
    "&:hover": {
      color: blue[800]
    }
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
  },
  chip: {
    margin: theme.spacing(1)
  }
});

export default withStyles(styles, { withTheme: true })(Dashboard);
