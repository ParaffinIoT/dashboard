const Parse = window.Parse;
const currentUser = Parse.User.current();
const username = currentUser && currentUser.get("username");
export const initialState = {
  isLoading: true,
  error: null,
  errorMsg: "",
  isSuccess: false,
  user_clients: []
};

export const START_UPDATING = "add-client/START_ADDING";
export const UPDATING_SUCCESS = "add-client/ADDING_SUCCESS";
export const UPDATING_FAILURE = "add-client/ADDING_FAILURE";
export const RESET_ERROR = "add-client/RESET_ERROR";
export const GETTING_USER_CLIENTS = "add-client/GETTING_USER_CLIENTS";
export const GETTING_USER_CLIENTS_SUCCESSFULL =
  "add-client/GETTING_USER_CLIENTS_SUCCESSFULL";

export const startUpdatingClient = () => ({
  type: START_UPDATING
});

export const updatingClientSuccess = isSuccess => ({
  type: UPDATING_SUCCESS,
  payload: { isSuccess }
});

export const updatingClientFailure = errorMsg => ({
  type: UPDATING_FAILURE,
  payload: { errorMsg }
});

export const startGettingUserClients = () => ({
  type: GETTING_USER_CLIENTS
});

export const gettingUserClientSuccessfull = user_clients => ({
  type: GETTING_USER_CLIENTS_SUCCESSFULL,
  payload: { user_clients }
});

export const resetError = () => ({
  type: RESET_ERROR
});

export const updateClient = ({
  clientName,
  adapters,
  className,
  clientId
}) => async dispatch => {
  dispatch(startUpdatingClient());

  try {
    const Clients = Parse.Object.extend(className);
    let query = new Parse.Query(Clients);
    let client = await query.get(clientId);
    await client.save({
      clientName,
      adapters
    });
    dispatch(updatingClientSuccess(true));
    // setTimeout(() => dispatch(addingClientSuccess(false)), 3000);
    setTimeout(() => window.location.reload(), 2000);
  } catch (error) {
    dispatch(updatingClientFailure(error.message));
  }
};

export const getUserClients = () => async dispatch => {
  dispatch(startGettingUserClients());
  try {
    let Clients = Parse.Object.extend(username);
    let query = new Parse.Query(Clients);
    query.equalTo("realm", Parse.User.current().get("username"));
    let user_clients = await query.find({});
    dispatch(gettingUserClientSuccessfull(user_clients));
  } catch (error) {
    dispatch(updatingClientFailure(error.message));
  }
};

export default function UpdateClientReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case START_UPDATING:
      return {
        ...state,
        isLoading: true
      };
    case UPDATING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: payload.isSuccess
      };
    case UPDATING_FAILURE:
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
    case GETTING_USER_CLIENTS_SUCCESSFULL:
      return {
        user_clients: payload.user_clients
      };
    default:
      return state;
  }
}
