import { compose, withState, withHandlers } from "recompose";
import {connect} from "react-redux"
import ClientView from "./clientView";
import {setClient} from "./ClientState"

export default compose(
  connect(
    state => ({
      client: state.client.client,
    }),
    { setClient }
  ),
  withState("mainChartState", "setMainChartState", "monthly"),
  withHandlers({
    handleSetClient: props => (client) => {
      props.setClient(client);
    }
  })
)(ClientView);
