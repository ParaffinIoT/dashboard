import { openAddTopic } from "../../pages/topics/topicsState";
import { setClient } from "../../pages/clients/ClientState";
const Parse = window.Parse;
const currentUser = Parse.User.current();
const username = currentUser && currentUser.get("username");
export const initialState = {
  isLoading: true,
  error: null,
  errorMsg: "",
  isSuccess: false
};

export const START_ADDING = "add-topic/START_ADDING";
export const ADDING_SUCCESS = "add-topic/ADDING_SUCCESS";
export const ADDING_FAILURE = "add-topic/ADDING_FAILURE";
export const RESET_ERROR = "add-topic/RESET_ERROR";

export const startAddingTopic = () => ({
  type: START_ADDING
});

export const addingTopicSuccess = isSuccess => ({
  type: ADDING_SUCCESS,
  payload: { isSuccess }
});

export const addingTopicFailure = errorMsg => ({
  type: ADDING_FAILURE,
  payload: { errorMsg }
});

export const resetError = () => ({
  type: RESET_ERROR
});

export const addTopic = ({
  clientData,
  adapter,
  topic,
  action,
  type
}) => async dispatch => {
  dispatch(startAddingTopic());

  try {
    const Client = Parse.Object.extend(username);
    let query = new Parse.Query(Client);
    let client = await query.get(clientData.objectId);
    let newAdapterWithTopic = clientData.adapters.map(value => {
      if (value.type === adapter) {
        let newTopics = [...value.topics, { topic, action, type }];
        value.topics = newTopics;
      }
      return value;
    });

    await client.save({
      adapters: newAdapterWithTopic
    });
    dispatch(addingTopicSuccess(true));
    const newClient = Object.assign({}, clientData, {
      adapters: newAdapterWithTopic
    });
    dispatch(openAddTopic(false));
    dispatch(setClient(newClient));
  } catch (error) {
    dispatch(addingTopicFailure(error.message));
  }
};

export default function AddTopicReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case START_ADDING:
      return {
        ...state,
        isLoading: true
      };
    case ADDING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: payload.isSuccess
      };
    case ADDING_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: true,
        errorMsg: payload.errorMsg
      };
    case RESET_ERROR:
      return {
        error: false,
        errorMsg: ""
      };
    default:
      return state;
  }
}
