import { combineReducers } from 'redux';

import layout from '../components/Layout/LayoutState';
import login from '../pages/login/LoginState';
import client from "../pages/clients/ClientState"

export default combineReducers({
  layout,
  login,
  client
});