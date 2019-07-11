import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import themes, { overrides } from '../themes';
import Layout from './Layout';
import Error from '../pages/error';
import Login from '../pages/login';
import Clients from "../pages/clients"
import AddClient from "../pages/add-client"
const theme = createMuiTheme({...themes.default, ...overrides});

const Parse = window.Parse
var currentUser = Parse.User.current();

const PrivateRoute = ({ component, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest} render={props => (
        isAuthenticated ? (
        React.createElement(component, props)
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      )
    )}
    />
  );
};

const PublicRoute = ({ component, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest} render={props => (
        isAuthenticated ? (
        <Redirect
          to={{
            pathname: '/',
          }}
        />
      ) : (
        React.createElement(component, props)
      )
    )}
    />
  );
};

const App = (props) => (
  <MuiThemeProvider theme={theme}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/clients" />} />
        <Route exact path="/client/:id" render={() => <Redirect to="/clients/dashboard/:id" />} />
        <PrivateRoute path="/clients/:id" component={Layout} isAuthenticated={props.isAuthenticated} />
        <PrivateRoute exact path="/clients" component={Clients} isAuthenticated={props.isAuthenticated} />
        <PublicRoute path="/login" component={Login} isAuthenticated={props.isAuthenticated} />
        <PrivateRoute exact path="/add-client" component={AddClient} isAuthenticated={props.isAuthenticated} />

        <Route component={Error} />
      </Switch>
    </BrowserRouter>
  </MuiThemeProvider>
);

export default App;