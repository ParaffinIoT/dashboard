import { combineReducers } from "redux";

import layout from "../components/Layout/LayoutState";
import login from "../pages/login/LoginState";
import client from "../pages/clients/ClientState";
import addClient from "../pages/add-client/addClientState";
import updateClient from "../components/update-client/updateClientState";
import addAdapter from "../components/add-adapters/addAdapterState";
import adapters from "../pages/adapters/adapterState";

export default combineReducers({
  layout,
  login,
  client,
  addClient,
  updateClient,
  addAdapter,
  adapters
});
