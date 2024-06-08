import { Navigate } from "react-router-dom";
import { ReactNode } from "react";


type TProtectedRoute = {
  isAllowed: boolean,
  children: ReactNode
}

export function ProtectedRoute ({
  isAllowed,
  children,
}: TProtectedRoute): JSX.Element {
  if (isAllowed === false) {
    return <Navigate to={"/login"} replace />;
  }

  return <>{children}</>;
};

export function ProtectedRouteForAuthUser ({
  isAllowed,
  children,
}: TProtectedRoute): JSX.Element{
  if (isAllowed === true) {
    return <Navigate to={'/'} replace />;
  }

  return <>{children}</>;
};

export function ProtectedResetRoute({
  isAllowed,
  children,
}: TProtectedRoute): JSX.Element{
  if (isAllowed === false) {
    return <Navigate to={"/forgot-password"} replace />;
  }

  return <>{children}</>;
};
