var passwordlessOptions = {
  allowedConnections: ['email'],
  passwordlessMethod: 'code',
  auth: {
    redirect: false,
    responseType: 'token id_token',
    params: {
      scope: 'openid email'           
    }          
  }
}

var lock = new window.Auth0LockPasswordless(
  process.env.REACT_APP_AUTH0_CLIENT_ID,
  process.env.REACT_APP_AUTH0_DOMAIN,
 passwordlessOptions
);

export default lock;
