import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { FileContextProvider } from "./contexts/fileContext";

ReactDOM.render(
  <React.StrictMode>
    <FileContextProvider>
      <App />
    </FileContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
