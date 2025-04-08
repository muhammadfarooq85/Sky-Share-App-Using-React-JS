// Libraries Imports
import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@material-tailwind/react";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
// Local Imports
import App from "./App.jsx";
import { ThemeProviderContext } from "./Context/ThemeContext.jsx";
import { UserContextProvider } from "./Context/UserContext.jsx";
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContextProvider>
      <ThemeProvider>
        <ThemeProviderContext>
          <BrowserRouter>
            <Toaster />
            <App />
          </BrowserRouter>
        </ThemeProviderContext>
      </ThemeProvider>
    </UserContextProvider>
  </React.StrictMode>
);
