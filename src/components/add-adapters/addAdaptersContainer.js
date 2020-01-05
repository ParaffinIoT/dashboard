import { withHandlers, withState, lifecycle, compose } from "recompose";
import AddAdapetView from "./addAdapterView";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addAdapter, resetError, editAdapter } from "./addAdapterState";
import { getUserClients } from "../../pages/clients/ClientState";
import deburr from "lodash/deburr";
const Parse = window.Parse;
export default compose(
  connect(
    state => ({
      isLoading: state.addAdapter.isLoading,
      error: state.addAdapter.error,
      errorMsg: state.addAdapter.errorMsg,
      isSuccess: state.addAdapter.isSuccess,
      user_clients: state.client.user_clients,
      client:state.client.client
    }),
    { addAdapter, resetError, getUserClients, editAdapter }
  ),
  withState("type", "setTyoe", ""),
  withState("enabled", "setEnabled", true),
  withState("secretType", "setSecreteType", "basic"),
  withState("password", "setPassword", ""),
  withState("startAfter", "setStartAfter", null),
  withState("expiredBefore", "setExpiredBefore", null),
  withRouter,
  withHandlers({
    handleAddAdapterButtonClick: props => async () => {      
      props.addAdapter({
        clientData:props.client,
        type:props.type,
        enabled:props.enabled,
        secretType:props.secretType,
        password:props.password,
        startAfter:props.startAfter,
        expiredBefore:props.expiredBefore
      });
    },

    handleEditAdapterButtonClick: props => async () => {      
      props.editAdapter({
        clientData:props.client,
        type:props.type,
        enabled:props.enabled,
        secretType:props.secretType,
        password:props.password,
        startAfter:props.startAfter,
        expiredBefore:props.expiredBefore
      });
    }
  }),
  lifecycle({
    componentDidMount() {
      this.props.resetError();
    }
  })
)(AddAdapetView);
