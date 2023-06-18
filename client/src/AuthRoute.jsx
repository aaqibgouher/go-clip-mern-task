import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const AuthRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  // If the token is not present, redirect to the login page
  //   if (!token && location.pathname !== "/login") {
  //     return <Navigate to="/login" replace />;
  //   }
  if (token && rest.path === "/login") {
    return <Navigate to="/" replace />;
  }

  if (!token && rest.path !== "/login") {
    return <Navigate to="/login" replace />;
  }

  // If the token is present, render the protected component
  return <Component {...rest} />;
};

export default AuthRoute;
