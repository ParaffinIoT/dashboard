import {setClient} from "../clients/ClientState"
const Parse = window.Parse;
const currentUser = Parse.User.current();
const username = currentUser && currentUser.get("username");
export const OPEN_ADD_ADAPTER = "Adapter/OPEN_ADD_ADAPTER";
export const openAddAdapter = isOpen => async dispatch => {
  dispatch({ type: OPEN_ADD_ADAPTER, payload: { isOpen } });
};

export const deleteAdapter = ({
  clientData,
  type
}) => async dispatch => {
  try {
    const Client = Parse.Object.extend(username);
    let query = new Parse.Query(Client);
    let client = await query.get(clientData.objectId);
    const newAdapters = clientData.adapters.filter(adapter=>adapter.type!==type)

    await client.save({
      adapters: newAdapters
    });
    const newClient = Object.assign({}, clientData, { adapters: newAdapters });
    dispatch(setClient(newClient));
  } catch (error) {
    // dispatch(addingAdapterFailure(error.message));
  }
};

const initialState = {
  isOpen: false
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case OPEN_ADD_ADAPTER:
      return Object.assign({}, state, { isOpen: payload.isOpen });
    default:
      return state;
  }
}
