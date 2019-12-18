import React from "react";
import {
  Grid,
  withStyles,
} from "@material-ui/core";
import PageTitle from "../../components/PageTitle";
const Dashboard = ({ classes, theme, ...props }) => {
  return (
    <React.Fragment>
      <PageTitle title="Dashboard" button="Latest Reports" />
      <Grid container spacing={32}>

      </Grid>
    </React.Fragment>
  );
};
const styles = theme => ({
  card: {
    minHeight: "100%",
    display: "flex",
    flexDirection: "column"
  },

});

export default withStyles(styles, { withTheme: true })(Dashboard);
