import React from "react";

const AuthSidebar = () => {
  const backgroundImage =
    "url('https://static-cse.canva.com/blob/1172708/EspaciosCoWorking.jpg')";

  return (
    // Se mantiene bg-gray-900 para el contraste de la barra lateral (es más oscuro que el fondo base)
    <div className="relative hidden w-full flex-col items-center justify-center bg-gray-900 lg:flex lg:w-1/2">
      {/* Background Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Contenido */}
      <div className="relative z-10 flex flex-col items-start p-12 text-white max-w-lg">
        {/* Logo y Título */}
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-(--color-primary)">
            <span className="material-symbols-outlined text-3xl text-white">
              lan
            </span>
          </div>
          <h1 className="font-display text-4xl font-bold">NodoLab</h1>
        </div>

        {/* Slogan */}
        <p className="mt-6 font-display text-4xl font-extrabold leading-tight tracking-tight">
          Your Space to Create and Connect.
        </p>
        <p className="mt-4 text-lg text-gray-300">
          Manage your workspace, billing, and community all in one place.
        </p>
      </div>
    </div>
  );
};

export default AuthSidebar;
