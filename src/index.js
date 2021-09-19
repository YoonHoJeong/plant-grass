import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import "bootstrap/dist/css/bootstrap.min.css";
import AppTest from "./appTest";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <AppTest />
  </React.StrictMode>,
  document.getElementById("root")
);
