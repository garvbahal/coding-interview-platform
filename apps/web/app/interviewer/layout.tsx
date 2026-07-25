"use client";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ({ children }: { children: React.ReactNode }) {
  const userDetails = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();

  useEffect(() => {
    if (!userDetails) {
      router.replace("/auth/login");
      return;
    }

    if (userDetails.role === "CANDIDATE") {
      router.replace("/candidate/dashboard");
    }
  }, [userDetails, router]);

  return <>{children}</>;
}
