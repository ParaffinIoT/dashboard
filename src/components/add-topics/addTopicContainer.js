import { withHandlers, withState, lifecycle, compose } from "recompose";
import AddTopicView from "./addTopicView";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addTopic, resetError } from "./addTopicState";
import { getUserClients } from "../../pages/clients/ClientState";
import deburr from "lodash/deburr";
const Parse = window.Parse;
export default compose(
  connect(
    state => ({
      isLoading: state.addTopic.isLoading,
      error: state.addTopic.error,
      errorMsg: state.addTopic.errorMsg,
      isSuccess: state.addTopic.isSuccess,
      user_clients: state.client.user_clients,
      client: state.client.client
    }),
    { addTopic, resetError, getUserClients }
  ),
  withState("type", "setTyoe", "rw"),
  withState("action", "setAction", "allow"),
  withState("topic", "setTopic", ""),
  withState("adapter", "setAdapter", ""),
  withRouter,
  withHandlers({
    handleAddAdapterButtonClick: props => async () => {
      props.addTopic({
        clientData: props.client,
        type: props.type,
        action: props.action,
        adapter: props.adapter,
        topic: props.topic
      });
    }
  }),
  lifecycle({
    componentDidMount() {
      this.props.resetError();
    }
  })
)(AddTopicView);
