import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { FavProvider } from "./context/FavProvider";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    {" "}
    <FavProvider>
      <App />
    </FavProvider>
  </BrowserRouter>
);
