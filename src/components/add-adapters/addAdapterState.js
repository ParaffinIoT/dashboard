import { openAddAdapter } from "../../pages/adapters/adapterState";
import {
  gettingUserClientSuccessfull,
  setClient
} from "../../pages/clients/ClientState";
const Parse = window.Parse;
const currentUser = Parse.User.current();
const username = currentUser && currentUser.get("username");
export const initialState = {
  isLoading: true,
  error: null,
  errorMsg: "",
  isSuccess: false
};

export const START_ADDING = "add-adapter/START_ADDING";
export const ADDING_SUCCESS = "add-adapter/ADDING_SUCCESS";
export const ADDING_FAILURE = "add-adapter/ADDING_FAILURE";
export const RESET_ERROR = "add-adapter/RESET_ERROR";

export const startAddingAdapter = () => ({
  type: START_ADDING
});

export const addingAdapterSuccess = isSuccess => ({
  type: ADDING_SUCCESS,
  payload: { isSuccess }
});

export const addingAdapterFailure = errorMsg => ({
  type: ADDING_FAILURE,
  payload: { errorMsg }
});

export const resetError = () => ({
  type: RESET_ERROR
});

export const addAdapter = ({
  clientData,
  type,
  enabled,
  secretType,
  password,
  startAfter,
  expiredBefore
}) => async dispatch => {
  dispatch(startAddingAdapter());

  try {
    const Client = Parse.Object.extend(username);
    let query = new Parse.Query(Client);
    let client = await query.get(clientData.objectId);
    const newAdapters = [
      ...clientData.adapters,
      {
        type,
        enabled,
        secret: {
          type: secretType,
          pwdhash: password,
          startAfter,
          expiredBefore
        },
        topics: []
      }
    ];

    await client.save({
      adapters: newAdapters
    });
    dispatch(addingAdapterSuccess(true));
    const newClient = Object.assign({}, clientData, { adapters: newAdapters });
    dispatch(openAddAdapter(false));
    dispatch(setClient(newClient));
  } catch (error) {
    dispatch(addingAdapterFailure(error.message));
  }
};

export const editAdapter = ({
  clientData,
  type,
  enabled,
  secretType,
  password,
  startAfter,
  expiredBefore
}) => async dispatch => {
  // dispatch(startAddingAdapter());

  try {
    const Client = Parse.Object.extend(username);
    let query = new Parse.Query(Client);
    let client = await query.get(clientData.objectId);
    const adapterIndex = clientData.adapters.findIndex(
      value => value.type === type
    );
    const adapterTopics = clientData.adapters[adapterIndex].topics;
    clientData.adapters[adapterIndex] = {
      type,
      enabled,
      secret: {
        type: secretType,
        pwdhash: password,
        startAfter,
        expiredBefore
      },
      topics: adapterTopics
    };
    const newAdapters = clientData.adapters;

    await client.save({
      adapters: newAdapters
    });
    // dispatch(addingAdapterSuccess(true));
    const newClient = Object.assign({}, clientData, { adapters: newAdapters });
    dispatch(openAddAdapter(false));
    dispatch(setClient(newClient));
  } catch (error) {
    // dispatch(addingAdapterFailure(error.message));
  }
};

export default function AddAdapterReducer(
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
