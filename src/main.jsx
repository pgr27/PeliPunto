import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { FavProvider } from "./context/FavProvider";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <FavProvider>
    <App />
  </FavProvider>
);
