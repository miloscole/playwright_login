import { credentials } from "../../config/credentials";

export const DATA = {
  existingUser: {
    email: credentials.user.email,
    password: credentials.user.password,
  },
  nonExistingUser: { email: "wrong@demo.com", password: "WrongPassword123" },
  empty: { email: "", password: "" },
  invalidEmail: "invalid.email",
};

export const URLS = {
  newSession: "/session/new",
  loginSelectors: "/login_selectors",
  dashboardSelectors: "/dashboard_selectors",
};

export const INVALID_SCENARIOS = [
  { email: "", password: "", description: "empty fields" },
  { email: DATA.existingUser.email, password: "", description: "only email" },
  {
    email: "",
    password: DATA.existingUser.password,
    description: "only password",
  },
  {
    email: DATA.existingUser.email,
    password: DATA.nonExistingUser.password,
    description: "right email/wrong password",
  },
  {
    email: DATA.nonExistingUser.email,
    password: DATA.existingUser.password,
    description: "wrong email/right password",
  },
];
