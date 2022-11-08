import React from "react";
import ReactDOM from "react-dom/client";
import "./General/css-files/index.css";
import App from "./General/App";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { BrowserRouter } from "react-router-dom";
import ErrorMessage from "./General/Redux/ErrorMessage";

const store = configureStore({
  reducer: {
    errorMessage: ErrorMessage,
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
