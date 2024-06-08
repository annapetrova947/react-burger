import { Navigate, useLocation } from "react-router-dom";
import { ReactNode, useEffect } from "react";
import { useLastRoute } from './LastRouteContext';



type TProtectedRoute = {
  isAllowed: boolean,
  children: ReactNode
}

export function ProtectedRoute ({
  isAllowed,
  children,
}: TProtectedRoute): JSX.Element {
  const location = useLocation();
  const { setLastRoute } = useLastRoute();

  useEffect(() => {
    if (!isAllowed) {
      setLastRoute(location.pathname);
    }
  }, [isAllowed, location.pathname, setLastRoute]);

  if (!isAllowed) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export function ProtectedRouteForAuthUser ({
  isAllowed,
  children,
}: TProtectedRoute): JSX.Element{
  const { lastRoute } = useLastRoute();

  if (isAllowed === true) {
    return <Navigate to={lastRoute || '/'} replace />;
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
