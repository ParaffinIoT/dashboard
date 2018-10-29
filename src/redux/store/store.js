import { applyMiddleware, compose, createStore } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import { rootReducer } from "./combineReducer";
const middleware = [thunk];
if (process.env.NODE_ENV === `development`) {
  const log = createLogger({ collapsed: true });

  middleware.push(log);
}

export const store = (initialState, options) =>
  createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware))
  );
