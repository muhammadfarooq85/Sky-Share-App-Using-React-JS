import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ThemeProvider } from "@material-tailwind/react";
import "./index.scss";
import { ThemeProviderContext } from "./Context/ThemeContext.jsx";
import { registerSW } from "virtual:pwa-register";
import { UserContextProvider } from "./Context/UserContext.jsx";

const updateSW = registerSW({
  onNeedRefresh() {},
  onOfflineReady() {},
});

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
