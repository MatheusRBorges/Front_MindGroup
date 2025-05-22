import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { ReactNode } from "react";

interface PrivateRouteProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { token, isLoading } = useAuth();

  if (isLoading) {
    return <div className="text-center mt-10">Carregando...</div>; // ou um spinner
  }

  return token ? children : <Navigate to="/" replace />;
}
