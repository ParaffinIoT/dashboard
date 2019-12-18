import { compose, withState, withHandlers, lifecycle } from "recompose";
import {connect} from "react-redux"
import ClientView from "./clientView";
import {setClient, getUserClients, deleteClient, openAddClient} from "./ClientState"
import {withRouter} from "react-router-dom"

export default compose(
  withRouter,
  connect(
    state => ({
      client: state.client,
      clientId: state.clientId,
      isOpen:state.client.isOpen
    }),
    { setClient, getUserClients, deleteClient , openAddClient}
  ),
  withState("mainChartState", "setMainChartState", "monthly"),
  withHandlers({
    handleSetClient: props => (client, history) => {
      props.setClient(client, history);
    }
  }),
  lifecycle({
    componentDidMount() {
        this.props.getUserClients();
      }
  })
)(ClientView);
