const {
  REACT_APP_AUTH0_DOMAIN,
  REACT_APP_AUTH0_CLIENT_ID,
  REACT_APP_AUTH0_AUDIENCE,
} = process.env;

export const env_config = {
  domain: REACT_APP_AUTH0_DOMAIN,
  clientId: REACT_APP_AUTH0_CLIENT_ID,
  redirectUri: "https://app.educapp.net.ar/#/educapp",
  audience: REACT_APP_AUTH0_AUDIENCE,
};

export const emailJsCredentials = {
  serviceId: "service_l2j7cb7",
  templateId: "template_qp62dbf",
  userId: "user_Vp1RXPv2G1KOb7O4XJsI4",
};
