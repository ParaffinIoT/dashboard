export const initialState = {
    client: null
  };
  
  export const SET_CLIENT = "Client/SET_CLIENT";
  
  export const setClient = client => dispatch => {
    return dispatch({ type: SET_CLIENT, client });
  };
  
  export default function ClientReducer(state = initialState, action) {
    switch (action.type) {
      case SET_CLIENT:
        return Object.assign({}, state, {client:action.client}) 
      default:
        return state;
    }
  }
  