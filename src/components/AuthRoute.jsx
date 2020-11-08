import React from "react";
import { Redirect } from "react-router-dom";
import links from "../constants/links";
import { isAuthenticated } from "../services/authentication";

// HOC which renders a given component if the user is logged in.
export default (Component, requiredPermissions = []) => {
  return (props) => {
    const hasPermission = isAuthenticated();
    if (!hasPermission) {
      return (
        <Redirect
          to={{ pathname: links.login, state: { from: props.location } }}
        />
      );
    }
    return <Component {...props} />;
  };
};
