import Link from "next/link";
import { SignupForm } from "./SignupForm";
import { LoginForm } from "./LoginForm";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleLoginButton } from "./GoogleLoginButton";

type RightPanelProps = {
  isSignup: boolean;
};

const SignUpText = {
  first: "Already have an account?",
  second: "Create an account",
  third: "Enter your details below to get started.",
};

const LoginText = {
  first: "Don't have an account?",
  second: "Log in to your account",
  third: "Welcome back! Please enter your details.",
};

export const RightPanel = ({ isSignup }: RightPanelProps) => {
  return (
    <div className="flex w-full flex-col justify-center px-6 lg:w-1/2 lg:px-20 xl:px-32 relative">
      <div className="absolute top-8 right-8 flex items-center gap-4 text-sm font-medium">
        <span className="text-gray-500">
          {isSignup ? SignUpText.first : LoginText.first}
        </span>
        <Link
          href={isSignup ? "/auth/login" : "/auth/signup"}
          className="text-black hover:underline"
        >
          {isSignup ? "Log in" : "Sign up"}
        </Link>
      </div>

      <Link href="/">
        <div className="mb-10 lg:hidden flex items-center gap-2 font-semibold text-xl tracking-tight text-gray-900">
          <div className="h-8 w-8 bg-black rounded-lg flex items-center justify-center text-white text-sm">
            CI
          </div>
          Coding Interviewer
        </div>
      </Link>

      <div className="w-full max-w-sm mx-auto">
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
          {isSignup ? SignUpText.second : LoginText.second}
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          {isSignup ? SignUpText.third : LoginText.third}
        </p>

        {isSignup ? <SignupForm /> : <LoginForm />}

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <GoogleLoginButton />
        </div>
      </div>
    </div>
  );
};
