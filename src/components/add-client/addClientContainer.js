import { withHandlers, withState, lifecycle, compose } from "recompose";
import AddClientView from "./addClientView";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addClient, resetError, editClient } from "./addClientState";
import { getUserClients } from "../../pages/clients/ClientState";
import deburr from "lodash/deburr";
const Parse = window.Parse;
export default compose(
  connect(
    state => ({
      isLoading: state.addClient.isLoading,
      error: state.addClient.error,
      errorMsg: state.addClient.errorMsg,
      isSuccess: state.addClient.isSuccess,
      user_clients: state.client.user_clients
    }),
    { addClient, resetError, getUserClients, editClient }
  ),
  withState("version", "setVersion", "1.0.0"),
  withState("clientName", "setClientName", ""),
  withState("clientExist", "setClientExist", false),
  withRouter,
  withHandlers({
    handleAddClientButtonClick: props => async () => {
      let exist = props.user_clients.find(
        value =>
          value.clientName.toLowerCase() === props.clientName.toLowerCase()
      );

      if (exist) {
        return;
      } else {
        props.addClient({
          clientName: props.clientName,
          version: props.version
        });
      }
    },
    handleEditClientButtonClick: props => async () => {

      props.editClient({
        clientData: props.clientData,
        clientName: props.clientName,
        version: props.version
      });
    }
  }),
  lifecycle({
    componentDidMount() {
      this.props.resetError();
      this.props.getUserClients();
    }
  })
)(AddClientView);
