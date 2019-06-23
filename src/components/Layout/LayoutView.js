import React from 'react';
import { withStyles, CssBaseline } from '@material-ui/core';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import classnames from 'classnames';

import Header from '../Header';
import Sidebar from '../Sidebar';

// pages
import Dashboard from '../../pages/dashboard';
import Typography from '../../pages/typography';
import Notifications from '../../pages/notifications';
import Maps from '../../pages/maps';
import Tables from '../../pages/tables';
import Icons from '../../pages/icons';
import Charts from '../../pages/charts';

const Layout = ({ classes, isSidebarOpened, toggleSidebar, client }) => (
  <div className={classes.root}>
    <CssBaseline />
    <BrowserRouter>
      <React.Fragment>
        <Header />
        <Sidebar />
        <div className={classnames(classes.content, { [classes.contentShift]: isSidebarOpened })}>
          <div className={classes.fakeToolbar} />
          <Switch>
            <Route path="/clients/dashboard/:id" component={Dashboard} />
            <Route path="/clients/typography/:id" component={Typography} />
            <Route path="/clients/tables/:id" component={Tables} />
            <Route path="/clients/notifications/:id" component={Notifications} />
            <Route exact path="/clients/ui/:id" render={() => <Redirect to={`/clients/ui/icons/${client}`} />} />
            <Route path="/clients/ui/maps/:id" component={Maps} />
            <Route path="/clients/ui/icons/:id" component={Icons} />
            <Route path="/clients/ui/charts:id" component={Charts} />
          </Switch>
        </div>
      </React.Fragment>
    </BrowserRouter>
  </div>
);

const styles = theme => ({
  root: {
    display: 'flex',
    maxWidth: '100vw',
    overflowX: 'hidden',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    width: `calc(100vw - 240px)`,
    minHeight: '100vh',
  },
  contentShift: {
    width: `calc(100vw - ${240 + theme.spacing.unit * 6}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  fakeToolbar: {
    ...theme.mixins.toolbar,
  }
});

export default withStyles(styles)(Layout);
