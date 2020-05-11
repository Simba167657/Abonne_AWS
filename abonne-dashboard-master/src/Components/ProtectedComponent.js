import React from "react";
import auth from "./auth";
import { Route } from "react-router-dom";

export const ProtectedComponent = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (auth.isAuthenticated()) {
          return <Component {...props} {...rest} />;
        } else {
          return <div></div>;
        }
      }}
    />
  );
};
