import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { getCurrentUser } from "../../services/auth.service";
import { clearUser, setUser } from "../../store/slices/authSlice";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector<RootState>((state) => state.auth.isLoading);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await getCurrentUser();
        dispatch(setUser(res.user));
      } catch (error) {
        dispatch(clearUser());
      }
    };
    checkAuth();
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
}
