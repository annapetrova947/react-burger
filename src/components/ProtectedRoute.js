import React from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({
  isAllowed,
  redirectPath = "/login",
  children,
}) => {
  if (isAllowed === false) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export const ProtectedRouteForAuthUser = ({
  isAllowed,
  redirectPath = "/",
  children,
}) => {
  if (isAllowed === true) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export const ProtectedResetRoute = ({
  isAllowed,
  redirectPath = "/forgot-password",
  children,
}) => {
  if (isAllowed === false) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};
