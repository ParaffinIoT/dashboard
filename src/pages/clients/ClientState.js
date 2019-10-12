const Parse = window.Parse;
const currentUser = Parse.User.current()
const username = currentUser && currentUser.get("username")
export const initialState = {
  client: null,
  user_clients: null,
  isSuccess: false,
  isLoading: false
};

export const SET_CLIENT = "Client/SET_CLIENT";
export const GET_USER_CLIENT = "Client/GET_USER_CLIENT";
export const GETTING_USER_CLIENTS = "Client/GETTING_USER_CLIENTS";
export const GETTING_USER_CLIENTS_SUCCESSFULL =
  "Client/GETTING_USER_CLIENTS_SUCCESSFULL";

export const startGettingUserClients = () => ({
  type: GETTING_USER_CLIENTS
});

export const gettingUserClientSuccessfull = user_clients => ({
  type: GETTING_USER_CLIENTS_SUCCESSFULL,
  payload: { user_clients }
});

export const getUserClients = (
  realm = username
) => async dispatch => {
  dispatch(startGettingUserClients());
  try {
    let user = await Parse.User.currentAsync()
   let usern = user.get("username")
    let Clients = Parse.Object.extend(usern);
    let query = new Parse.Query(Clients);
    query.equalTo("realm", realm);
    let user_clients = await query.find();
    console.log(query.toJSON().where)
    dispatch(gettingUserClientSuccessfull(user_clients));
  } catch (error) {
    alert(error.message)
    // dispatch(addingClientFailure(error.message));
  }
};
export const setClient = client => dispatch => {
  return dispatch({ type: SET_CLIENT, payload: { client } });
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
    default:
      return state;
  }
}
