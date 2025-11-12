import React, { useState } from "react";
import {
  Squares2X2Icon,
  UsersIcon,
  ComputerDesktopIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";

const navItems = [
  { name: "Dashboard", icon: Squares2X2Icon, current: false },
  { name: "Members", icon: UsersIcon, current: false },
  { name: "Resources", icon: ComputerDesktopIcon, current: true }, // Marcado como activo
  { name: "Billing", icon: CreditCardIcon, current: false },
];

const Sidebar = () => {
  const workspaceName = "NodoLab";
  const workspaceType = "Coworking Space";

  // Inicializa el item activo con el que tenga current:true o el primero.
  const initialActive =
    navItems.find((i) => i.current)?.name || navItems[0].name;
  const [active, setActive] = useState(initialActive);

  return (
    <div className="flex h-screen w-64 flex-col bg-gray-800 text-white shadow-xl">
      {/* Encabezado del Workspace */}
      <div className="flex items-center space-x-3 p-4 border-b border-gray-700">
        {/* Icono del Perfil/Workspace */}
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-sm font-semibold">
          {workspaceName.charAt(0)}
        </div>
        <div>
          <h1 className="text-sm font-bold">{workspaceName}</h1>
          <p className="text-xs text-gray-400">{workspaceType}</p>
        </div>
      </div>

      {/* Navegación Principal */}
      <nav className="flex-1 space-y-2 p-4">
        {navItems.map((item) => {
          const isActive = active === item.name;
          // fondo azul más transparente y texto/icono azul cuando está activo
          const itemClasses = isActive
            ? "bg-blue-600/20 text-blue-300" // fondo semitransparente + texto/icono azul
            : "text-gray-300 hover:bg-gray-700 hover:text-white";

          return (
            <a
              key={item.name}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setActive(item.name);
              }}
              className={`group flex items-center rounded-lg p-3 text-sm font-medium transition-colors ${itemClasses}`}
              aria-current={isActive ? "page" : undefined}
            >
              {/* El icono hereda el color actual (currentColor) de la clase de texto */}
              <item.icon className="mr-3 h-5 w-5" aria-hidden="true" />
              {item.name}
            </a>
          );
        })}
      </nav>

      {/* Las opciones "Settings" y "Help" han sido omitidas de la parte inferior. */}
      {/* Si quisieras agregar un separador o un espacio, podrías usar: */}
      {/* <div className="mt-auto p-4 border-t border-gray-700"></div> */}
    </div>
  );
};

export default Sidebar;
