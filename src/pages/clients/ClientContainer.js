import { compose, withState, withHandlers, lifecycle } from "recompose";
import {connect} from "react-redux"
import ClientView from "./clientView";
import {setClient, getUserClient} from "./ClientState"
import {withRouter} from "react-router-dom"

export default compose(
  withRouter,
  connect(
    state => ({
      client: state.client,
    }),
    { setClient, getUserClient }
  ),
  withState("mainChartState", "setMainChartState", "monthly"),
  withHandlers({
    handleSetClient: props => (client) => {
      props.setClient(client);
    }
  }),
  lifecycle({
    componentDidMount() {
        this.props.getUserClient("");
      }
  })
)(ClientView);
