"use client";
import { GoogleLogin } from "@react-oauth/google";

export default function Home() {
  return (
    <div className="">
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
        }}
      />
    </div>
  );
}
