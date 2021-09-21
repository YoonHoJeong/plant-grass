import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import "bootstrap/dist/css/bootstrap.min.css";
import AppTest from "./appTest";
import "./index.css";
import UserAuth from "./services/userAuth";

const userAuth = new UserAuth();

ReactDOM.render(
  <React.StrictMode>
    <AppTest userAuth={userAuth} />
  </React.StrictMode>,
  document.getElementById("root")
);
