import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context"

const PrivateRoutes = ({ children }) => {
  const { token } = useAuth();
  const location = useLocation();

  return token ? children : <Navigate to='/login' state={{ from: location }} replace />
}

export { 
  PrivateRoutes
};