import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth, type Role } from "../context/AuthContext";

export const ProtectedRoute = ({
  children,
  allow,
}: {
  children: ReactNode;
  allow?: Role[];
}) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center font-mono text-sm text-slate">
        Loading…
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  if (allow && !allow.includes(user.role)) return <Navigate to="/" replace />;

  return <>{children}</>;
};
