export const routes = {
  landingPage: "/",
  mainApp: "/educapp/**",
  dashboard: (currentRole) => `/educapp/${currentRole}/dashboard`,
};

export const roles = {
  ADMIN: "admin",
  TEACHER: "teacher",
  STUDENT: "student",
};
