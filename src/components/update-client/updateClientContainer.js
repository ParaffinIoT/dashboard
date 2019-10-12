import { withHandlers, withState, lifecycle, compose } from "recompose";
import AddClientView from "./updateClientView";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addClient, updateClient, resetError } from "./updateClientState";
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
    { addClient, updateClient, resetError, getUserClients }
  ),
  withState("adapter", "setAdapter", null),
  withState("topics", "setTopics", []),
  withState("currentTopic", "setCurrentTopic", ""),
  withState("clientName", "setClientName", ""),
  withState("httpExist", "setHttpExist", false),
  withState("mqttExist", "setMqttExist", false),
  withState("coapExist", "setCoapExist", false),
  withState("isNew", "setIsNew", true),
  withRouter,
  withHandlers({
    addAdapter: props => event => {
      props.setAdapter(event.target.value);
    },
    checkIfAdapterTypeExist: props => (name = props.clientName) => {
      let clientExist = props.user_clients.find(
        value => value.get("clientName").toLowerCase() === name.toLowerCase()
      );
      if (clientExist) {
        let httpExist = clientExist
          .get("adapters")
          .find(value => value.type === "http");
        let mqttExist = clientExist
          .get("adapters")
          .find(value => value.type === "mqtt");
        let coapExist = clientExist
          .get("adapters")
          .find(value => value.type === "coap");
        if (httpExist) {
          props.setHttpExist(true);
        } else {
          props.setHttpExist(false);
        }
        if (mqttExist) {
          props.setMqttExist(true);
        } else {
          props.setMqttExist(false);
        }

        if (coapExist) {
          props.setCoapExist(true);
        } else {
          props.setCoapExist(false);
        }
      } else {
        props.setHttpExist(false);
        props.setMqttExist(false);
        props.setCoapExist(false);
      }
    },

    addTopic: props => () => {
      props.setTopics([
        ...props.topics,
       {topic: `${Parse.User.current().get("username")}/${props.currentTopic}`}
      ]);
      props.setCurrentTopic("");
    },

    getAdapterTopics: props => event => {
      let client = props.user_clients.find(value => {
        return (
          value.get("clientName").toLowerCase() ===
          props.adapterClientName.toLowerCase()
        );
      });

      let topics =
        client &&
        client.get("adapters").find(value => value.type == event.target.value);

        topics && props.setTopics(topics.topics);
      console.log("topics is ", topics.topics);
    },

    removeTopic: props => key => {
      props.topics.splice(key, 1);
    },
    handleAddClientButtonClick: props => async () => {
      let exist = props.user_clients.find(
        value =>
          value.get("clientName").toLowerCase() ===
          props.clientName.toLowerCase()
      );

      if (!exist) {
        props.addClient({
          clientName: props.clientName,
          adapter: props.adapter,
          topicList: props.topics
        });
      } else {
        props.updateClient({
          clientId: exist.id,
          adapter: props.adapter,
          topicList: props.topics
        });
      }

      if (!props.isLoading && !props.error) {
        //   await  props.setAdapter(null);
        //   await  props.setClientName("");
        //  await   props.setHttpExist(false);
        //   await  props.setMqttExist(false);
        //   await  props.setCoapExist(false);
        //   props.getUserClients()
      }
    },
    getSuggestions: props => (value, { showEmpty = false } = {}) => {
      const inputValue = deburr(value.trim()).toLowerCase();
      const inputLength = inputValue.length;
      let count = 0;

      return inputLength === 0 && !showEmpty
        ? []
        : props.user_clients.filter(suggestion => {
            const keep =
              count < 5 &&
              suggestion
                .get("clientName")
                .slice(0, inputLength)
                .toLowerCase() === inputValue;

            if (keep) {
              count += 1;
            }

            return keep;
          });
    }
  }),
  lifecycle({
    componentDidMount() {
      this.props.resetError();
      this.props.getUserClients();
      if (this.props.adapterClientName) {
        this.props.setClientName(this.props.adapterClientName);
        this.props.checkIfAdapterTypeExist(this.props.adapterClientName);
      }
    }
  })
)(AddClientView);
