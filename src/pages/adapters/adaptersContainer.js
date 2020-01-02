import { compose, withState, withHandlers } from "recompose";
import { connect } from "react-redux";
import AdaptersView from "./adaptersView";
import { openAddAdapter, deleteAdapter } from "./adapterState";

export default compose(
  connect(
    state => ({
      client: state.client.client,
      isOpen: state.adapters.isOpen
    }),
    {openAddAdapter, deleteAdapter}
  ),
  withHandlers({
    
  })
)(AdaptersView);
