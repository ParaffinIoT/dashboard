import { compose, withState, withHandlers } from "recompose";
import { connect } from "react-redux";
import TopicsView from "./topicsView";
import { openAddTopic } from "./topicsState";

export default compose(
  connect(
    state => ({
      client: state.client.client,
      isOpen: state.topics.isOpen
    }),
    { openAddTopic }
  ),
  withHandlers({})
)(TopicsView);
