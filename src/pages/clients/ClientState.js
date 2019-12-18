import { async } from "q";

const Parse = window.Parse;
const currentUser = Parse.User.current();
const username = currentUser && currentUser.get("username");

export const initialState = {
  client: null,
  user_clients: null,
  isSuccess: false,
  isLoading: false,
  isOpen: false
};

export const SET_CLIENT = "Client/SET_CLIENT";
export const GET_USER_CLIENT = "Client/GET_USER_CLIENT";
export const GETTING_USER_CLIENTS = "Client/GETTING_USER_CLIENTS";
export const GETTING_USER_CLIENTS_SUCCESSFULL =
  "Client/GETTING_USER_CLIENTS_SUCCESSFULL";

export const GETTING_USER_CLIENTS_FAILURE =
  "Client/GETTING_USER_CLIENTS_FAILURE";

export const DELETING_CLIENT_SUCCESSFULL = "Client/DELETING_CLIENT_SUCCESSFULL";

export const DELETING_CLIENT_FAILURE = "Client/DELETING_CLIENT_FAILURE";
export const OPEN_ADD_CLIENT = "Client/OPEN_ADD_CLIENT";

export const startGettingUserClients = () => ({
  type: GETTING_USER_CLIENTS
});

export const gettingUserClientSuccessfull = user_clients => ({
  type: GETTING_USER_CLIENTS_SUCCESSFULL,
  payload: { user_clients }
});

export const gettingUserClientFailure = message => ({
  type: GETTING_USER_CLIENTS_FAILURE,
  payload: { message }
});

export const openAddClient = isOpen => dispatch =>
  dispatch({ type: OPEN_ADD_CLIENT, payload: { isOpen } });
export const getUserClients = (realm = username) => async dispatch => {
  dispatch(startGettingUserClients());
  try {
    let user = await Parse.User.currentAsync();
    let userJson = user.toJSON();
    let Clients = Parse.Object.extend(userJson.username);
    let query = new Parse.Query(Clients);
    query.equalTo("realm", realm);
    let user_clients = await query.find();
    let user_clients_json = user_clients.map(value => value.toJSON());
    dispatch(gettingUserClientSuccessfull(user_clients_json));
  } catch (error) {
    dispatch(gettingUserClientFailure(error.message));
  }
};
export const setClient = (client, history) => dispatch => {
  if (!history) dispatch({ type: SET_CLIENT, payload: { client } });
   history.push(`clients/adapters/${client.objectId}`);
   return   dispatch({ type: SET_CLIENT, payload: { client } });

};

export const deleteClient = (className, clientId) => async dispatch => {
  try {
    const Clients = Parse.Object.extend(className);
    let query = new Parse.Query(Clients);
    let client = await query.get(clientId);
    await client.destroy({});
    dispatch({ type: DELETING_CLIENT_SUCCESSFULL, payload: null });
    setTimeout(() => window.location.reload(), 500);
  } catch (error) {
    return dispatch({
      type: DELETING_CLIENT_FAILURE,
      payload: { message: error.message }
    });
  }
};

export default function ClientReducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_CLIENT:
      return Object.assign({}, state, { client: payload.client });
    case GETTING_USER_CLIENTS:
      return Object.assign({}, state, {
        isLoading: true
      });
    case GETTING_USER_CLIENTS_SUCCESSFULL:
      return Object.assign({}, state, {
        user_clients: payload.user_clients,
        isSuccess: true,
        isLoading: false
      });
    case OPEN_ADD_CLIENT:
      console.log(OPEN_ADD_CLIENT);

      return Object.assign({}, state, {
        isOpen: payload.isOpen
      });
    default:
      return state;
  }
}
