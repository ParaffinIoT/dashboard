import React from "react";
import {
  Grid,
  LinearProgress,
  Select,
  OutlinedInput,
  MenuItem,
  withStyles,
  CssBaseline,
  Button
} from "@material-ui/core";
import Widget from "../../components/Widget";
import PageTitle from "../../components/PageTitle";
import { Typography } from "../../components/Wrappers";
import { Link } from "react-router-dom";
import Header from "../../components/Header";


const Dashboard = ({ classes, theme, client, history, ...props }) => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <div className={classes.content} />

      <PageTitle title="Clients" button="Add New Clients" onBtnClick={ ()=> history.push("/add-client") } />
      <Grid container spacing={4}>
        {client.user_clients.map((value, index) => {
          return (
            <Grid item lg={3} md={4} sm={6} xs={12} key={index}>
              <Widget
                title={value.clientName}
                upperTitle
                className={classes.card}
                bodyClass={classes.fullHeightBody}
              >
                <div className={classes.btnContainer}>
                  <small className={classes.version}>Version: {value.ver}</small>

                  <Button
                    component={Link}
                    to={`clients/dashboard/${value.clientId}`}
                    color="primary"
                    size="large"
                    className={classes.forgetButton}
                    onClick = {()=>props.handleSetClient(value.clientId)}
                  >
                    Select
                  </Button>
                </div>
              </Widget>
            </Grid>
          );
        })}
      </Grid>
    </React.Fragment>
  );
};

const styles = theme => ({
  content: {
    padding: theme.spacing.unit * 3
  },
  card: {
    minHeight: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  fullHeightBody: {
    height: "23vh"
  },
  btnContainer: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: "inherit"
  },

  forgetButton: {
    textTransform: "none",
    fontWeight: 400
  },
  version: {
    paddingBottom: "15px"
  }
});

export default withStyles(styles, { withTheme: true })(Dashboard);
