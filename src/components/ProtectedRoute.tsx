"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";
import { PageLoader } from "@/components/LoadingSpinner";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "user" | "admin";
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push(`/login?redirect=${encodeURIComponent(window.location.pathname)}`);
      } else if (requiredRole === "admin" && user.role !== "admin") {
        router.push("/");
      }
    }
  }, [user, loading, router, requiredRole]);

  if (loading) return <PageLoader />;
  if (!user) return null;
  if (requiredRole === "admin" && user.role !== "admin") return null;

  return <>{children}</>;
}
