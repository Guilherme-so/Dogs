import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserToken } from "../../Redux/user/userSlice";

function ProtectedRoute({ redirectPath = "/login", children }) {
  const token = useSelector(selectUserToken);

  if (!token) {
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children : <Outlet />;
}

export default ProtectedRoute;
