const Parse = window.Parse
export const initialState = {
  isLoading: false,
  isAuthenticated:Parse.User.current(),
  error: null,
  errorMsg:""
};

export const START_LOGIN = "Login/START_LOGIN";
export const LOGIN_SUCCESS = "Login/LOGIN_SUCCESS";
export const LOGIN_FAILURE = "Login/LOGIN_FAILURE";
export const RESET_ERROR = "Login/RESET_ERROR";
export const LOGIN_USER = "Login/LOGIN_USER";
export const SIGN_OUT_SUCCESS = "Login/SIGN_OUT_SUCCESS";

export const startLogin = () => ({
  type: START_LOGIN
});

export const loginSuccess = () => ({
  type: LOGIN_SUCCESS
});

export const loginFailure = (errorMsg) => ({
  type: LOGIN_FAILURE, payload :{errorMsg}
});

export const resetError = () => ({
  type: RESET_ERROR
});

export const loginUser = (name, password) => async dispatch => {
  dispatch(startLogin());
  if (name && password) {
    try {
      await Parse.User.logIn(name, password);
      dispatch(loginSuccess());
      window.location.reload()
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  } else {
    dispatch(loginFailure("Provide all required fields"));
  }
};

export const signUpUser = (name, email, password)=> async dispatch =>{
  dispatch(startLogin())
  if (name && email && password) { 
    var user = new Parse.User();
    user.set("username", name);
    user.set("password", password);
    user.set("email", email);
    try {
    await user.signUp();
    dispatch(loginSuccess());
    window.location.reload()
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  } else {
    dispatch(loginFailure("Complete all required fields"));
  }
}

export const signOutSuccess = () => ({
  type: SIGN_OUT_SUCCESS
});

export const signOut = () => async dispatch => {
 await Parse.User.logOut()
  dispatch(signOutSuccess());
};

export default function LoginReducer(state = initialState, { type, payload }) {
  switch (type) {
    case START_LOGIN:
      return {
        ...state,
        isLoading: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        error: null
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: true,
       errorMsg: payload.errorMsg
      };
    case RESET_ERROR:
      return {
        error: false,
        errorMsg:""
      };
    case SIGN_OUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false
      };
    default:
      return state;
  }
}
