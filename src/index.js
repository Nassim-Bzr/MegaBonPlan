// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App/App";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./AuthContext"; // Assurez-vous que le chemin est correct

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>

        <App />
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
