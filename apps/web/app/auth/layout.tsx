"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { CodeSpinner } from "../../components/spinners/CodeSpinner";

export default function authLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const isAuthenticated = useSelector<RootState>(
    (state) => state.auth.isAuthenticated,
  );
  const isLoading = useSelector<RootState>((state) => state.auth.isLoading);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <CodeSpinner />
      </div>
    );
  }

  return <>{children}</>;
}
