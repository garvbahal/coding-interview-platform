"use client";

import { useState } from "react";

export const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const onSubmit = (e: Event) => {
    e.preventDefault;
  };

  return (
    <div>
      <form className="mt-8 space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Full name
          </label>
          <input
            type="text"
            id="name"
            required
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
            }}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm"
            placeholder="John Doe"
          />
        </div>
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
        <button
          type="submit"
          className="mt-2 flex w-full justify-center rounded-md bg-black px-4 py-2 text-sm cursor-pointer font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-colors"
        >
          Sign up
        </button>
      </form>
    </div>
  );
};
