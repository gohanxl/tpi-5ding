const {
  REACT_APP_AUTH0_DOMAIN,
  REACT_APP_AUTH0_CLIENT_ID,
  REACT_APP_AUTH0_AUDIENCE,
} = process.env;

export const env_config = {
  domain: REACT_APP_AUTH0_DOMAIN,
  clientId: REACT_APP_AUTH0_CLIENT_ID,
  redirectUri: window.location.origin,
  audience: REACT_APP_AUTH0_AUDIENCE,
};
