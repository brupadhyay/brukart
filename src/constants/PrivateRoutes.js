import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "../context";
import { toastNotification } from "../utils";

const PrivateRoutes = ({ children }) => {
  const { token } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if(!token) {
      toastNotification("WARNING", "You're not logged-in!")
    }
  }, [])

  return token ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export { PrivateRoutes };

