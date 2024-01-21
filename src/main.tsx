import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { BuildProviderTree } from "./lib/utils/BuildProviderTree";
import { UserContextProvider } from "./context/UserContext.tsx";

const Providers = BuildProviderTree([UserContextProvider]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename="/Textenger">
      <Providers>
        <App />
      </Providers>
    </BrowserRouter>
  </React.StrictMode>
);
