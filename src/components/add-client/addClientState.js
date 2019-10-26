const Parse = window.Parse;
const currentUser = Parse.User.current()
const username = currentUser && currentUser.get("username")
export const initialState = {
  isLoading: true,
  error: null,
  errorMsg: "",
  isSuccess: false,
  user_clients: []
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

export const addClient = ({
  clientName,
  adapter,
  topicList
}) => async dispatch => {
  dispatch(startAddingClient());

  try {
    const Clients = Parse.Object.extend(username);
    const clients = new Clients();
    // sample adapterList is ["http", "mqtt"]
    let topics = topicList.map(value => {
      return {
        topic: value,
        action:"allow",
        type:"rw"
      };
    });

    let adapters = [{
      type:adapter,
      enabled:true,
      topics:topics,
    }
    ]

    await clients.save({
      clientName,
      adapters,
      ver: "1.0",
      realm: Parse.User.current().get("username")
    });
    dispatch(addingClientSuccess(true));
   // setTimeout(() => dispatch(addingClientSuccess(false)), 3000);
   setTimeout(()=>window.location.reload(), 2000)
  } catch (error) {
    dispatch(addingClientFailure(error.message));
  }
};

export const addMoreAdapter = ({
  clientId,
  adapter,
  topicList
}) => async dispatch => {
  dispatch(startAddingClient());

  try {
    const Clients = Parse.Object.extend(username);
    let query = new Parse.Query(Clients);
   let client = await query.get(clientId)

    let topics = topicList.map(value => {
      return {
        topic: value,
        action:"allow",
        type:"rw"
      };
    });

    let adapters = [...client.get("adapters"),{
      type:adapter,
      enabled:false,
      topics:topics,
    }
    ]

     client.set(
      "adapters", adapters
    );
    client.save()
    dispatch(addingClientSuccess(true));
   // setTimeout(() => dispatch(addingClientSuccess(false)), 3000);
   setTimeout(()=>window.location.reload(), 2000)

  } catch (error) {
    dispatch(addingClientFailure(error.message));
  }
};

export const getUserClients = () => async dispatch => {
  dispatch(startGettingUserClients());
  try {
    let Clients = Parse.Object.extend(username);
    let query = new Parse.Query(Clients);
    query.equalTo("realm", Parse.User.current().get("username"));
    let user_clients = await query.find({});
    console.log("user_clients.toJson()")
    dispatch(gettingUserClientSuccessfull(user_clients));
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
    case GETTING_USER_CLIENTS_SUCCESSFULL:
      return {
        user_clients: payload.user_clients
      };
    default:
      return state;
  }
}
