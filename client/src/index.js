import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/App.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { theme } from "./Theme";
import { DataContext } from "./context/DataContext";
import { UserContext } from "./context/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <UserContext>
        <DataContext>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </DataContext>
      </UserContext>
    </ThemeProvider>
  </React.StrictMode>
);
