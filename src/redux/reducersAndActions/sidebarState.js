export function sidebarCollapse(collapsed) {
  return dispatch => {
    dispatch({ type: "SIDEBAR_STATE_CHANGING", collapsed: collapsed });
  };
}

export function minSidebarCollapse(collapsed) {
  return dispatch => {
    dispatch({ type: "MIN_SIDEBAR_STATE_CHANGED", minCollapse: collapsed });
  };
}

const initialState = {
  collapsed: false,
  minCollapse: false
};

export function sidebarCollapseReducer(state = initialState, action) {
  switch (action.type) {
    case "SIDEBAR_STATE_CHANGING":
      return Object.assign({}, state, {
        collapsed: action.collapsed
      });

    default:
      return state;
  }
}

export function minSidebarCollapseReducer(state = initialState, action) {
  switch (action.type) {
    case "MIN_SIDEBAR_STATE_CHANGED":
      return Object.assign({}, state, {
        minCollapse: action.minCollapse
      });

    default:
      return state;
  }
}
