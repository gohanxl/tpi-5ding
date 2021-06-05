export const routes = {
  landingPage: "/",
  mainApp: "/educapp/**",
  dashboard: (currentRole) => `/educapp/${currentRole}/dashboard`,
};
