const Parse = window.Parse;
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

export const startAddingClient = () => ({
  type: START_ADDING
});

export const addingClientSuccess = (isSuccess) => ({
  type: ADDING_SUCCESS, payload:{isSuccess}
});

export const addingClientFailure = errorMsg => ({
  type: ADDING_FAILURE,
  payload: { errorMsg }
});

export const resetError = () => ({
  type: RESET_ERROR
});

export const addClient = ({
  clientName,
  adapterList,
  startAfter,
  expiredBefore
}) => async dispatch => {
  dispatch(startAddingClient());

  try {
    const Clients = Parse.Object.extend("Clients");
    const clients = new Clients();
    // sample adapterList is ["http", "mqtt"]
    let adapters = adapterList.map(value => {
      return {
        type: value,
        secret: {
          startAfter,
          expiredBefore
        },
        enabled: true,
        topics: []
      };
    });

   await clients.save({
      clientName,
      adapters,
      ver: "1.0",
      realm: Parse.User.current().get("username")
    });
    dispatch(addingClientSuccess(true));
    setTimeout(()=>    dispatch(addingClientSuccess(false)), 3000
    )
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
        isSuccess:payload.isSuccess
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
