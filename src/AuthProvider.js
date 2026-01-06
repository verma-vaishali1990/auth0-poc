import React from "react";
import { Auth0AculProvider } from "@auth0/auth0-acul-react";

export default function AuthProvider({ children }) {
  return (
    <Auth0AculProvider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      customDomain={process.env.REACT_APP_AUTH0_CUSTOM_DOMAIN}
      redirectUri={window.location.origin}
    >
      {children}
    </Auth0AculProvider>
  );
}
