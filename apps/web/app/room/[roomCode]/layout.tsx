"use client";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useEffect } from "react";

export default function roomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);

  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (!isAuthenticated) {
      router.replace("/auth/signup");
      return;
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
