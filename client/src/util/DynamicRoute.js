import React from "react";
import { Route, Redirect } from "react-router-dom";

import { useAuthState } from "../context/authcontext";
const DynamicRoute = (props) => {
  const { user } = useAuthState();
  if (props.authenticated && !user) {
    return <Redirect to="/auth" />;
  } else if (props.guest && user) {
    return <Redirect to="/" />;
  } else {
    return <Route component={props.component} {...props} />;
  }
};

export default DynamicRoute;
