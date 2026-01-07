import React, { useEffect } from 'react';
import lock from './auth/lock';

function callApi(accessToken) {
  fetch('http://localhost:3000/auth/protected', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));
}

function App() {

  useEffect(() => {
    // Fired after successful authentication
    lock.on('authenticated', (authResult) => {
      console.log('Auth Result:', authResult);

      if (authResult && authResult.accessToken) {
        console.log('Access Token:', authResult.accessToken);
         // Call API with accessToken
  callApi(authResult.accessToken);
      }

      if (authResult && authResult.idToken) {

        console.log('ID Token:', authResult.idToken);
      }
    });

    // Handle errors
    lock.on('authorization_error', (error) => {
      console.error('Auth Error:', error);
    });

    return () => {
      lock.off('authenticated');
      lock.off('authorization_error');
    };
  }, []);

  const login = () => {
    lock.show();
  };

  return (
    <div>
      <h1>Auth0 Lock Email OTP POC</h1>
      <button onClick={login}>Login with Email OTP</button>
    </div>
  );
}

export default App;
