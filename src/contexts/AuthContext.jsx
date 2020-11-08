import React, { createContext, useState } from "react";
import { isAuthenticated, getExpirationTime } from "../services/authentication";

const AuthContext = createContext(null);
const { Provider } = AuthContext;
const initAuth = {
  state: isAuthenticated() ? "login" : "logout",
  timeout: getExpirationTime(),
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(initAuth);

  return <Provider value={{ auth, setAuth }}>{children}</Provider>;
};

export default AuthContext;
