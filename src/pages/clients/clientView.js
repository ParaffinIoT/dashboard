import React from "react";
import {
  Grid,
  withStyles,
  CssBaseline,
  Button,
  Icon,
  Modal,
  Fade,
  IconButton
} from "@material-ui/core";
import Widget from "../../components/Widget";
import PageTitle from "../../components/PageTitle";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import { red, blue } from "@material-ui/core/colors";
import AddClient from "../../components/add-client";
import UpdateClient from "../../components/update-client";
import Chip from "@material-ui/core/Chip";
import CloseIcon from "@material-ui/icons/Close";
import updateClientContainer from "../../components/update-client";
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
  const [openAddClient, setOpenAddClient] = React.useState(false);
  const [openUpdateClient, setOpenUpdateClient] = React.useState(false);
  const [clientName, setClientName] = React.useState(null);
  const [modalStyle] = React.useState(getModalStyle);
  const openAddClientHandler = () => {
    setOpenAddClient(true);
  };

  const closeAddClient = () => {
    setOpenAddClient(false);
  };

  const openUpdateClientHandler = adapterClientName => () => {
    setOpenUpdateClient(true);
    setClientName(adapterClientName);
  };

  const closeUpdateClient = () => {
    setOpenUpdateClient(false);
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <Header />

      <div style={{ marginTop: "90px", marginLeft: "2%", marginRight: "2%" }}>
        <PageTitle title="Clients" />
      </div>
      <div className={classes.content}>
        {client.user_clients && client.user_clients.length > 0 && (
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
                  onClick={() => props.openAddClient(true)}
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
                    title={value.clientName}
                    menus={[
                      {
                        title: "Edit",
                        onClick: openUpdateClientHandler(value.clientName)
                      },
                      {
                        title: "Delete",
                        onClick: () =>
                          props.deleteClient(value.className, value.id)
                      }
                    ]}
                    upperTitle
                    className={classes.card}
                    bodyClass={classes.fullHeightBody}
                  >
                    {value.adapters.length > 0 ? (
                      <div
                        style={{
                          display: "flex",
                          flexFlow: "row wrap",
                          marginTop: "20px"
                        }}
                      >
                        {value.adapters.map((val, i) => (
                          <Chip
                            size="small"
                            label={val.type}
                            className={classes.chip}
                            color="secondary"
                          />
                        ))}
                      </div>
                    ) : (
                      <div style={{ margin: "auto" }}>
                        <p style={{textAlign:"center"}}>No adapter for this client</p>
                        <Chip
                          variant="outlined"
                          size="small"
                          label="Clickable"
                          label="Add Now"
                          style={{marginLeft:"20%"}}
                          color="primary"
                          onClick={() => ""}
                        />
                      </div>
                    )}

                    <div className={classes.btnContainer}>
                      <Chip
                        variant="outlined"
                        size="small"
                        label={value.ver}
                        color="secondary"
                      />
                      <Button
                        // component={Link}
                        // to={`clients/dashboard/${value.id}`}
                        color="primary"
                        size="small"
                        className={classes.forgetButton}
                        onClick={() =>
                          props.handleSetClient(value, history)
                        }
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

        {client.user_clients && client.user_clients.length === 0 && (
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
                  onClick={() => props.openAddClient(true)}
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
        open={props.isOpen}
        onClose={()=>props.openAddClient(false)}
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
                onClick={()=>props.openAddClient(false)}
              >
                <CloseIcon />
              </IconButton>
            </div>
            <div className={classes.paper}>
              <AddClient adapterClientName={clientName} />
            </div>
          </div>
        </Fade>
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
