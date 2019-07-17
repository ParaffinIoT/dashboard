import { withHandlers, withState, lifecycle, compose } from "recompose";
import AddClientView from "./addClientView";
import { withRouter } from "react-router-dom";
import {connect} from "react-redux"
import {addClient, resetError} from "./addClientState"
export default compose(
    connect(
        state => ({
          isLoading: state.addClient.isLoading,
          error: state.addClient.error,
          errorMsg:state.addClient.errorMsg,
          isSuccess:state.addClient.isSuccess

        }),
        { addClient, resetError }
      ),
  withState("adapters", "setAdapters", []),
  withState("startAfter", "setStartAfter", null),
  withState("expiredBefore", "setExpiredBefore", null),
  withState("clientName", "setClientName", ""),
  withRouter,
  withHandlers({
    handleChange: props => event => {
      props.setAdapters(event.target.value);
    }, 
    handleAddClientButtonClick : props=>()=>{
        props.addClient({clientName:props.clientName, adapterList:props.adapters, startAfter:props.startAfter, expiredBefore:props.expiredBefore})
        if(!props.isLoading && !props.error){
            props.setAdapters([])
            props.setClientName("")
            props.setStartAfter(null)
            props.setExpiredBefore(null)
        }
    }
  }),
  lifecycle({
    componentDidMount(){
      this.props.resetError()
    }
  })
)(AddClientView);
