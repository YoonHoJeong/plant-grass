import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AppTest from "./appTest";
import "./index.css";
import { ProvideAuth } from "./hooks/useAuth";

ReactDOM.render(
  <React.StrictMode>
    <ProvideAuth>
      <AppTest />
    </ProvideAuth>
  </React.StrictMode>,
  document.getElementById("root")
);
