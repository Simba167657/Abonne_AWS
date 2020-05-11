import React from "react";
import { Route } from "react-router-dom";
import auth from "./auth";

export const CustomRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (auth.isAuthenticated()) {
          props.history.push("/");
        } else {
          rest.setStyle && rest.setStyle("layout-login");
          return <Component {...props} />;
        }
      }}
    />
  );
};
