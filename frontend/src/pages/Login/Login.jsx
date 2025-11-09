// src/pages/Login.jsx
import React from "react";
import "../../index.css";
import InputForm from "../../components/InputForm/InputForm";

export default function Login() {
  return (
    <div className="relative flex  w-full bg-(--background-light) dark:bg-(--background-dark) font-display text-gray-800 dark:text-gray-200">
      <div className="flex  grow flex-col">
        <div className="flex flex-1 flex-columns">
          {/* Left Column */}
          <div className="left-column text-justify">
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

              <InputForm />

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
