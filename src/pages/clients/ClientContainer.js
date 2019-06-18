import { compose, withState } from "recompose";

import ClientView from "./clientView";

export default compose(
  withState("mainChartState", "setMainChartState", "monthly")
)(ClientView);
