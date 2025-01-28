import { ReactNode } from "react";

import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { verifyToken } from "../../utils/verifyToken";
import {
  logout,
  selectCurrentToken,
  TUser,
} from "@/redux/features/auth/authSlice";

type TProtectedRoute = {
  children: ReactNode;
  role: "admin" | "customer" | undefined;
};

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  const token = useAppSelector(selectCurrentToken);
  let user;
  if (token) {
    user = verifyToken(token) as TUser;
  }
  const dispatch = useAppDispatch();
  if (!token) {
    return <Navigate to="/login" />;
  }
  if (role !== undefined && user?.role !== role) {
    dispatch(logout());
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
