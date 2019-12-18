export const OPEN_ADD_ADAPTER = "Adapter/OPEN_ADD_ADAPTER";
export const openAddAdapter = isOpen => async dispatch => {
  dispatch({ type: OPEN_ADD_ADAPTER, payload: { isOpen } });
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
