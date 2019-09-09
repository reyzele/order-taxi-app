import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "normalize.css";
import "./index.css";

import createStore from "./store";
import RootRouter from "components/RootRouter";

const store = createStore();

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <RootRouter />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
