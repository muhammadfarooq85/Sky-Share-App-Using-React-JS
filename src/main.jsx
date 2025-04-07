// Libraries Imports
import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@material-tailwind/react";
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
          <App />
        </ThemeProviderContext>
      </ThemeProvider>
    </UserContextProvider>
  </React.StrictMode>
);
