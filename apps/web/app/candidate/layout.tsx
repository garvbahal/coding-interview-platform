"use client";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CodeSpinner } from "../../components/spinners/CodeSpinner";

export default function CandiateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading, isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth,
  );
  const router = useRouter();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!isAuthenticated) {
      router.replace("/auth/login");
    }

    if (isAuthenticated && user!.role !== "CANDIDATE") {
      router.replace("/interviewer/dashboard");
    }
  }, [isLoading, router, isAuthenticated, user]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <CodeSpinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
