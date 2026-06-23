"use client";
import { GoogleLogin } from "@react-oauth/google";

export default function Home() {
  return (
    <div>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
        }}
      />
    </div>
  );
}
