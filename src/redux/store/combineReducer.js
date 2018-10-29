import { combineReducers } from "redux";
import {
  sidebarCollapseReducer,
  minSidebarCollapseReducer
} from "../reducersAndActions/sidebarState";
export const rootReducer = combineReducers({
  sidebarCollapseReducer,
  minSidebarCollapseReducer
});
