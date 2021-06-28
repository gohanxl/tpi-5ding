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

export const rootStyles = [
  "--primary",
  "--secondary",
  "--darker-primary",
  "--dark-primary",
  "--light-aquamarine",
  "--aquamarine",
  "--light-blue",
];

export const standardThemeValues = [
  "#1eaac3",
  "#f5dc17",
  "#1f4d57",
  "#24778a",
  "#aadbc7",
  "#8bd2b0",
  "#b8e3ec",
];

export const colorblindModeThemeValues = {
  "--primary": "#00b4b2",
  "--secondary": "#005150",
  "--darker-primary": "#005150",
  "--dark-primary": "#005150",
  "--light-aquamarine": "#00b4b2",
  "--aquamarine": "#00b4b2",
  "--light-blue": "#00b4b2",
};
