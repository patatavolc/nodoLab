import React from "react";
import AuthSidebar from "../../components/AuthSidebar.jsx";
import InputGroup from "../../components/InputGroup.jsx";

const LoginPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario de Login enviado.");
  };

  return (
    // CLASE BASE: Usamos bg-background-base y el color de texto claro (gray-200) por defecto
    <div className="bg-background-base font-display text-gray-200 min-h-screen w-full">
      <div className="flex h-full grow flex-col min-h-screen">
        <div className="flex flex-1 min-h-screen">
          <div className="flex w-full flex-col lg:flex-row min-h-screen">
            {/* Columna Izquierda (Branding) */}
            <AuthSidebar />

            {/* Columna Derecha (Formulario) */}
            <div className="flex w-full flex-col items-center justify-center bg-background-base p-6 lg:w-1/2 lg:p-12">
              <div className="w-full max-w-md">
                {/* Mobile Logo */}
                <div className="mb-8 flex items-center justify-center gap-3 lg:hidden">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <span className="material-symbols-outlined text-2xl text-white">
                      lan
                    </span>
                  </div>
                  <h1 className="font-display text-3xl font-bold text-white">
                    NodoLab
                  </h1>
                </div>

                {/* Encabezado */}
                <div className="mb-8 text-center lg:text-left">
                  {/* Forzamos el texto a blanco para el contraste */}
                  <h2 className="text-4xl font-black leading-tight tracking-[-0.033em] text-white">
                    Welcome Back
                  </h2>
                  <p className="mt-2 text-base font-normal leading-normal text-gray-400">
                    Log in to manage your NodoLab account
                  </p>
                </div>

                {/* Formulario */}
                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                  <InputGroup
                    label="Email Address"
                    type="email"
                    placeholder="you@example.com"
                  />
                  <InputGroup
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                  />

                  {/* Enlace de Contraseña Olvidada */}
                  <div className="flex justify-end">
                    <a
                      className="text-sm font-medium leading-normal text-primary hover:underline"
                      href="#"
                    >
                      Forgot Password?
                    </a>
                  </div>

                  {/* Botón de Login */}
                  <button
                    className="flex h-14 w-full items-center justify-center rounded-lg bg-primary px-6 text-base font-bold text-white 
                    border transition-colors hover:bg-(--color-primary) focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background-base"
                    type="submit"
                  >
                    Log In
                  </button>
                </form>

                {/* Pie de Formulario */}
                <div className="mt-8 text-center">
                  <p className="text-sm text-gray-400">
                    Need an account?{" "}
                    <a
                      className="font-medium text-primary hover:underline"
                      href="#"
                    >
                      Contact Support
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
