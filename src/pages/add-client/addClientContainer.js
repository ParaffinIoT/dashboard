import { withHandlers, withState, lifecycle, compose } from "recompose";
import AddClientView from "./addClientView";
import AutoComplete from "./autocomplete"
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addClient, resetError } from "./addClientState";
export default compose(
  connect(
    state => ({
      isLoading: state.addClient.isLoading,
      error: state.addClient.error,
      errorMsg: state.addClient.errorMsg,
      isSuccess: state.addClient.isSuccess
    }),
    { addClient, resetError }
  ),
  withState("adapter", "setAdapter", ""),
  withState("topics", "setTopics", []),
  withState("currentTopic", "setCurrentTopic", ""),
  withState("clientName", "setClientName", ""),
  withRouter,
  withHandlers({
    addAdapter: props => event => {
      props.setAdapter(event.target.value);
    },
    addTopic: props => () => {
      props.setTopics([...props.topics, props.currentTopic]);
      props.setCurrentTopic("");
    },

    removeTopic:props=>key=>{
      props.topics.splice(key, 1)
      
      alert(props.topics)
    },
    handleAddClientButtonClick: props => () => {
      props.addClient({
        clientName: props.clientName,
        adapter: props.adapter,
        topics: props.topics
      });
      if (!props.isLoading && !props.error) {
        props.setAdapter([]);
        props.setClientName("");
        props.setStartAfter(null);
        props.setExpiredBefore(null);
      }
    }
  }),
  lifecycle({
    componentDidMount() {
      this.props.resetError();
    }
  })
)(AddClientView);
