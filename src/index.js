import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { makeServer } from "./server";

import App from "./App";
import { AuthContextProvider, ProductProvider, OrderProvider } from "./context/index";
import "./index.css";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ProductProvider>
        <OrderProvider>
          <Router>
            <App />
          </Router>
        </OrderProvider>
      </ProductProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
