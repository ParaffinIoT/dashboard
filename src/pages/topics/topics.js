import React from 'react';
import { Grid, withStyles } from '@material-ui/core';

import PageTitle from '../../components/PageTitle/PageTitle';
import Widget from '../../components/Widget/WidgetContainer';
import { Typography } from '../../components/Wrappers/Wrappers';
import Table from "../tables"

const Topics = ({ classes }) => (
  <React.Fragment>
    <PageTitle title="Topics"/>
    <Grid container spacing={32}>
<Table/>
    </Grid>
  </React.Fragment>
);

const styles = theme => ({
  dashedBorder: {
    border: '1px dashed',
    borderColor: theme.palette.primary.main,
    padding: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit * 4,
    marginTop: theme.spacing.unit,
  },
  text: {
    marginBottom: theme.spacing.unit * 2,
  },
})

export default withStyles(styles)(Topics);
