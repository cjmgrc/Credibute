import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
const RequireAuth = () => {
  const { user } = useAuth();
  const location = useLocation();
  if (!user)
    return _jsx(Navigate, {
      to: "/signin",
      state: { from: location.pathname },
      replace: true,
    });
  return _jsx(Outlet, {});
};
export default RequireAuth;
