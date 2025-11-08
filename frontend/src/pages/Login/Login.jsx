// src/pages/Login.jsx
import React from "react";
import "../../index.css";

export default function Login() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-(--background-light) dark:bg-(--background-dark) font-display text-gray-800 dark:text-gray-200">
      <div className="flex h-full grow flex-col">
        <div className="flex flex-1 flex-columns">
          {/* Left Column */}
          <div className="left-column">
            <div
              className="bg-cover-center"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDYY_rJQfSm9a7CPmtwOoDsIBVLvLWSDmCRBAlV23j5kOJXPVEeeiEVxJbyaFh2Kj6qayxwT1f_zb2wd01_t_Ychjx41poQQleRFSTX-obLvqenVvDzpprzhc3HBwI8XhTQlio6WHd9xOQmvGF566PhS5L4O9tTDes5L5X6ubodOpL-DebNO6dz9rQe97QMKail54wF4BqAg-86rMt09lk-G1787VT8g5knGYRpmBkKYqvQjASfNB04DTxeulgri-H1MPL_j6A-VDjs')",
              }}
            >
              <div className="bg-overlay"></div>
            </div>
            <div className="relative z-10 flex flex-col items-start p-12 text-white max-w-lg">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-(--primary)">
                  <span className="material-symbols-outlined text-3xl text-white">lan</span>
                </div>
                <h1 className="font-display text-4xl font-bold">NodoLab</h1>
              </div>
              <p className="mt-6 font-display text-4xl font-extrabold leading-tight tracking-tight">
                Your Space to Create and Connect.
              </p>
              <p className="mt-4 text-lg text-gray-300">
                Manage your workspace, billing, and community all in one place.
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="right-column">
            <div className="max-form-width">
              {/* Mobile Logo */}
              <div className="mb-8 flex items-center justify-center gap-3 lg:hidden">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-(--primary)">
                  <span className="material-symbols-outlined text-2xl text-white">lan</span>
                </div>
                <h1 className="font-display text-3xl font-bold text-gray-900 dark:text-white">
                  NodoLab
                </h1>
              </div>

              {/* Heading */}
              <div className="mb-8 text-center lg:text-left">
                <h2 className="text-login-title">Welcome Back</h2>
                <p className="text-login-subtitle">Log in to manage your NodoLab account</p>
              </div>

              {/* Form */}
              <form className="flex flex-col gap-5">
                <label className="flex flex-col">
                  <p className="pb-2 text-base font-medium leading-normal text-gray-800 dark:text-gray-200">
                    Email Address
                  </p>
                  <input className="input-custom" placeholder="you@example.com" type="email" />
                </label>

                <label className="flex flex-col">
                  <p className="pb-2 text-base font-medium leading-normal text-gray-800 dark:text-gray-200">
                    Password
                  </p>
                  <div className="input-password-container">
                    <input
                      className="input-password"
                      placeholder="Enter your password"
                      type="password"
                    />
                    <div className="input-password-toggle">
                      <span className="material-symbols-outlined text-2xl">visibility_off</span>
                    </div>
                  </div>
                </label>

                <div className="flex justify-end">
                  <a
                    className="text-sm font-medium leading-normal text-(--primary) hover:underline"
                    href="#"
                  >
                    Forgot Password?
                  </a>
                </div>

                <button type="submit" className="button-primary">
                  Log In
                </button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Need an account?{" "}
                  <a className="font-medium text-(--primary) hover:underline" href="#">
                    Contact Support
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
