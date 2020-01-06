import { openAddClient, gettingUserClientSuccessfull } from "../../pages/clients/ClientState";
const Parse = window.Parse;
const currentUser = Parse.User.current();
const username = currentUser && currentUser.get("username");
export const initialState = {
  isLoading: true,
  error: null,
  errorMsg: "",
  isSuccess: false
};

export const START_ADDING = "add-client/START_ADDING";
export const ADDING_SUCCESS = "add-client/ADDING_SUCCESS";
export const ADDING_FAILURE = "add-client/ADDING_FAILURE";
export const RESET_ERROR = "add-client/RESET_ERROR";
export const GETTING_USER_CLIENTS = "add-client/GETTING_USER_CLIENTS";
export const GETTING_USER_CLIENTS_SUCCESSFULL =
  "add-client/GETTING_USER_CLIENTS_SUCCESSFULL";

export const startAddingClient = () => ({
  type: START_ADDING
});

export const addingClientSuccess = isSuccess => ({
  type: ADDING_SUCCESS,
  payload: { isSuccess }
});

export const addingClientFailure = errorMsg => ({
  type: ADDING_FAILURE,
  payload: { errorMsg }
});

export const resetError = () => ({
  type: RESET_ERROR
});

export const addClient = ({ clientName, version }) => async (dispatch, getState) => {
  dispatch(startAddingClient());

  try {
    const Clients = Parse.Object.extend(username);
    const clients = new Clients();
    let adapters = [];

    let new_client = await clients.save({
      clientName,
      adapters,
      ver: version,
      realm: Parse.User.current().get("username")
    });
    const {user_clients} = getState().client
    const new_user_clients = user_clients.map(value=>value)
    new_user_clients.push(new_client.toJSON())
    dispatch(addingClientSuccess(true));
    dispatch(openAddClient(false));
    dispatch(gettingUserClientSuccessfull(new_user_clients))
  } catch (error) {
    dispatch(addingClientFailure(error.message));
  }
};


export const editClient = ({clientData, clientName, version }) => async (dispatch, getState) => {
  dispatch(startAddingClient());

  try {
    const Client = Parse.Object.extend(username);
    let query = new Parse.Query(Client);
    let client = await query.get(clientData.objectId);
    let adapters = clientData.adapters;

    let new_client = await client.save({
      clientName,
      adapters,
      ver: version,
      realm: Parse.User.current().get("username")
    });
    const {user_clients} = getState().client
    const new_user_clients = user_clients.map(value=>value)
    const clientIndex = new_user_clients.findIndex(value=>value.clientName===clientData.clientName)
    new_user_clients[clientIndex]=new_client.toJSON()
    dispatch(addingClientSuccess(true));
    dispatch(openAddClient(false));
    dispatch(gettingUserClientSuccessfull(new_user_clients))
  } catch (error) {
    dispatch(addingClientFailure(error.message));
  }
};

export default function AddClientReducer(
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
