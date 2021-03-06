import { withHandlers, withState, lifecycle, compose } from "recompose";
import AddTopicView from "./addTopicView";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addTopic, resetError, editTopic } from "./addTopicState";
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
    { addTopic, resetError, getUserClients, editTopic }
  ),
  withState("type", "setType", "rw"),
  withState("action", "setAction", "allow"),
  withState("topic", "setTopic", ""),
  withState("oldTopic", "setOldTopic", ""),
  withState("adapter", "setAdapter", ""),
  withState("topicExist", "setTopicExist", false),
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
    },
    handleEditAdapterButtonClick: props => async () => {
      props.editTopic({
        clientData: props.client,
        type: props.type,
        oldTopic: props.oldTopic,
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
