"use client";

import { useState } from "react";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <form className="mt-8 space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email address
          </label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm"
            placeholder="jane@example.com"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm"
          />
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-900"
            >
              Remember me
            </label>
          </div>
          <div className="text-sm">
            <a href="#" className="font-medium text-black hover:underline">
              Forgot password?
            </a>
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 flex w-full justify-center rounded-md bg-black px-4 py-2 text-sm font-medium cursor-pointer text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-colors"
        >
          Log in
        </button>
      </form>
    </div>
  );
};
