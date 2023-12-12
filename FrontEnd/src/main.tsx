import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENTID}
      redirectUri={window.location.origin}
      // audience="https://localhost:5173"
      // scope="read:current_user update:current_user_metadata read1:current_user_metadata"
      // useRefreshTokens={true}
      // cacheLocation="memory"
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
