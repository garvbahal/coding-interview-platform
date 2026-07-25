"use client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "../store";
import AuthProvider from "../components/auth/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
        >
          <AuthProvider>{children}</AuthProvider>
        </GoogleOAuthProvider>
        <Toaster />
      </QueryClientProvider>
    </Provider>
  );
}
