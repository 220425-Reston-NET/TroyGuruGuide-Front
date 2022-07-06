import React from "react";
// import {createStore} from 'redux'
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./reducers/index";
// import rootReducer from "./reducers/";
import { Provider } from "react-redux";

const store = createStore(
  rootReducer,
  applyMiddleware(thunk),
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function DataProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

export default DataProvider;
