import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter as Router } from "react-router-dom";

import { ProductProvider } from "./context/ProductContext/ProductContext";
import { AuthContextProvider } from "./context/AuthContext/auth-context";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthContextProvider>
        <ProductProvider>
          <App />
        </ProductProvider>
      </AuthContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
