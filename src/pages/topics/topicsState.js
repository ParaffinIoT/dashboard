import {setClient} from "../clients/ClientState"
const Parse = window.Parse;
const currentUser = Parse.User.current();
const username = currentUser && currentUser.get("username");
export const OPEN_ADD_TOPIC = "Topic/OPEN_ADD_TOPIC";
export const openAddTopic = isOpen => async dispatch => {
  dispatch({ type: OPEN_ADD_TOPIC, payload: { isOpen } });
};

export const deleteTopic = ({
  clientData,
  adapter,
  topic
}) => async dispatch => {
  
  try {
    const Client = Parse.Object.extend(username);
    let query = new Parse.Query(Client);
    let client = await query.get(clientData.objectId);
    let newAdapterWithTopic = clientData.adapters.map(value => {
      if (value.type === adapter) {
        let newTopics = value.topics.filter(
          topicObj => topicObj.topic !== topic
        );
        value.topics = newTopics;
      }
      return value;
    });

    await client.save({
      adapters: newAdapterWithTopic
    });
    const newClient = Object.assign({}, clientData, {
      adapters: newAdapterWithTopic
    });
    dispatch(setClient(newClient));
  } catch (error) {
  }
};

const initialState = {
  isOpen: false
};

export default function topicsReducer(state = initialState, { type, payload }) {
  switch (type) {
    case OPEN_ADD_TOPIC:
      return Object.assign({}, state, { isOpen: payload.isOpen });
    default:
      return state;
  }
}
