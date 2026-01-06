import React, { useEffect, useState } from "react";
import lock from "./auth/lock";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    lock.on("authenticated", (authResult) => {
      lock.getUserInfo(authResult.accessToken, (err, profile) => {
        if (err) {
          console.error(err);
          return;
        }
        setUser(profile);
      });
    });

    lock.on("authorization_error", (err) => {
      console.error("Auth error:", err);
    });

    return () => {
      lock.off("authenticated");
    };
  }, []);

  const login = () => {
    lock.show();
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Auth0 Lock Email OTP POC</h1>

      {!user ? (
        <button onClick={login}>Login with Email OTP</button>
      ) : (
        <>
          <h2>Welcome {user.email}</h2>
          <button onClick={() => lock.logout({ returnTo: window.location.origin })}>
            Logout
          </button>
        </>
      )}
    </div>
  );
}

export default App;
