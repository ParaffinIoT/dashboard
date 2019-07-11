import { compose, withState, withHandlers, lifecycle } from "recompose";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import LoginView from "./LoginView";
import { loginUser, resetError, signUpUser } from "./LoginState";

export default compose(
  connect(
    state => ({
      isLoading: state.login.isLoading,
      isAuthenticated: state.login.isAuthenticated,
      error: state.login.error,
      errorMsg:state.login.errorMsg
    }),
    { loginUser, resetError, signUpUser }
  ),
  withRouter,
  withState("activeTabId", "setActiveTabId", 0),
  withState("nameValue", "setNameValue", ""),
  withState("emailValue", "setEmailValue", ""),
  withState("passwordValue", "setPasswordValue", ""),
  withHandlers({
    handleTabChange: props => (e, id) => {
      props.setActiveTabId(id);
      props.resetError();
    },
    handleInput: props => (e, input = "name") => {
      if (props.error) {
        props.resetError();
      }

      if (input === "email") {
        props.setEmailValue(e.target.value);
      } else if (input === "password") {
        props.setPasswordValue(e.target.value);
      } else if (input === "name") {
        props.setNameValue(e.target.value);
      }
    },
    handleLoginButtonClick: props => async () => {

      props.loginUser(props.nameValue, props.passwordValue);

    },

    handleSignUpButtonClick: props => async () => {

      props.signUpUser(props.nameValue, props.emailValue, props.passwordValue);

    },

  }),
  lifecycle({
    componentWillReceiveProps(nextProps) {
      if (!this.props.error && nextProps.error) {
        this.props.setPasswordValue("");
      }
    },
    componentDidMount(){
      this.props.resetError()
    }
  })
)(LoginView);
