export const OPEN_ADD_TOPIC = "Topic/OPEN_ADD_TOPIC";
export const openAddTopic = isOpen => async dispatch => {
  dispatch({ type: OPEN_ADD_TOPIC, payload: { isOpen } });
};

const initialState = {
  isOpen: false
};

export default function topicsReducer(state = initialState, { type, payload }) {
  switch (type) {
    case OPEN_ADD_TOPIC:
      return Object.assign({}, state, { isOpen: payload.isOpen });
    default:
      return state;
  }
}
