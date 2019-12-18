import { compose, withState } from "recompose";
import {connect} from "react-redux"
import DashboardView from "./Dashboard";

export default compose(
  connect(
    state => ({
      client:state.client.client
    }),
    {  },
  ),
  withState("mainChartState", "setMainChartState", "monthly")
)(DashboardView);
