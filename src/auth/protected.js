
import { jwtVerify, createRemoteJWKSet } from 'jose';

const JWKS = createRemoteJWKSet(
  new URL('https://dev-tlf6u2zudmwgunqz.us.auth0.com/.well-known/jwks.json')
);

export default async function handler(req, res) {
  try {
    const auth = req.headers.authorization;
    if (!auth) {
      return res.status(401).json({ error: 'Missing Authorization header' });
    }

    const token = auth.split(' ')[1];

    const { payload } = await jwtVerify(token, JWKS, {
      issuer: 'https://dev-tlf6u2zudmwgunqz.us.auth0.com/',
      audience: 'HpAmpMF7NL6rPtWorkVSYLmrfggBU8uv'
    });

    res.status(200).json({
      message: 'Passwordless API access granted',
      user: payload.sub,
      email: payload.email
    });
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}
