import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { MyContextProvider } from "./components/ContextProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <MyContextProvider>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </MyContextProvider>
);
