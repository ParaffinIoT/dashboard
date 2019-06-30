import userClients from "./user_client"
export const initialState = {
    client: null,
    user_clients:[]
  };
  
  export const SET_CLIENT = "Client/SET_CLIENT";
  export const GET_USER_CLIENT = "Client/GET_USER_CLIENT"
  
  export const setClient = client => dispatch => {
    return dispatch({ type: SET_CLIENT, client });
  };

  export const getUserClient = user => dispatch =>{
    return dispatch({type:GET_USER_CLIENT, user_clients:userClients})
  }
  
  export default function ClientReducer(state = initialState, action) {
    switch (action.type) {
      case SET_CLIENT:
        return Object.assign({}, state, {client:action.client}) 
        case GET_USER_CLIENT:
          return Object.assign({}, state, {user_clients:action.user_clients}) 
      default:
        return state;
    }
  }
  