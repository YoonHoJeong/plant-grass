import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import "./index.css";
import { ProvideAuth } from "./hooks/useAuth";

ReactDOM.render(
  <React.StrictMode>
    <ProvideAuth>
      <App />
    </ProvideAuth>
  </React.StrictMode>,
  document.getElementById("root")
);
