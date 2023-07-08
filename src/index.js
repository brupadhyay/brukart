import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { makeServer } from "./server";

import App from "./App";
import { AuthContextProvider, ProductProvider } from "./context/index";
import "./index.css";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ProductProvider>
        <Router>
          <App />
        </Router>
      </ProductProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
