import React from "react";
import ReactDOM from "react-dom";

import Router from "@/presentation/router";
import { ConcretePageFactory } from "./factories";

import reportWebVitals from "../reportWebVitals";

const pageFactory = new ConcretePageFactory();

ReactDOM.render(
  <React.StrictMode>
    <Router MakeLogin={pageFactory.getPage("Login")} />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
