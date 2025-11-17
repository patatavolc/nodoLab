
# FECHA: 17/11/2025

### ARCHIVOS MODIFICADOS

- frontend/src/pages/Dashboard/Dashboard.jsx (modificado)
- frontend/src/components/Dashboard/QuickActions.jsx (creado)
- frontend/src/components/Dashboard/RecentActivity.jsx (creado)
- frontend/src/components/Dashboard/CurrentOccupancyGauge.jsx (creado)
- frontend/src/components/Dashboard/DailyBookingsChart.jsx (creado)  <!-- creado según mensaje de commit -->

### DESCRIPCION

Se añadió e integró la mayor parte del Dashboard del frontend. 
- `Dashboard.jsx` ahora realiza fetch a la API (API_BASE_URL: /api/dashboard) y centraliza la carga de: stats, dailyBookings, occupancy y recentActivity. Maneja estados de carga y error.
- Nuevos componentes añadidos para componer la página:
  - `QuickActions.jsx`: acciones rápidas (gestión de reservas, pagos, directorio, anuncios).
  - `RecentActivity.jsx`: listado de actividad con iconos y colores por tipo.
  - `CurrentOccupancyGauge.jsx`: medidor visual de porcentaje de ocupación.
  - `DailyBookingsChart.jsx`: componente para visualización de reservas diarias (creado según mensaje de commit).
  
El Dashboard renderiza tarjetas de estadísticas (StatCard), gráfico de reservas diarias, medidor de ocupación, actividad reciente y el panel de acciones rápidas.

### OBSERVACIONES

- Validar que el endpoint API (/api/dashboard) devuelva las claves esperadas: stats (array de 4), dailyBookings, occupancy (num), recentActivity (array).
- Comprobar rutas e imports relativos (p. ej. Layout importado desde ../Layout.jsx en Dashboard).
- Revisar dependencias (heroicons ya usado; si `DailyBookingsChart` usa librería de charts, agregarla a package.json).
- Probar la animación del gauge y el comportamiento con datos nulos/vacíos (fallbacks ya contemplados en el Dashboard).
- Añadir tests o stubs para la API del dashboard en entorno de desarrollo si no existe backend listo.

---

# FECHA: 13/11/2025

### ARCHIVOS MODIFICADOS

- frontend/src/Layout.jsx (creado)  <!-- creado en commit "Layour component" -->
- frontend/src/App.jsx (modificado)
- frontend/src/pages/Login/Login.jsx (modificado)

### DESCRIPCION

Se introdujo un componente de Layout para estandarizar la estructura de páginas (header/sidebar/contenido) y se realizaron refactors en la estructura de la aplicación para usar ese layout. Además, se limpiaron y ajustaron estilos/estructura de la página de Login para encajar en la nueva organización de componentes.

### OBSERVACIONES

- Confirmar la ubicación exacta de `Layout.jsx` y que todas las páginas lo consuman correctamente (Dashboard importa ../Layout.jsx).
- Revisar que los cambios en `App.jsx` y Login no rompan las rutas ni el flujo de autenticación.
- Actualizar documentación o README si la estructura de carpetas/entrypoints cambió.

---

# FECHA: 12/11/2025

### ARCHIVOS MODIFICADOS

- frontend/src/App.jsx (modificado)

### DESCRIPCION

Ajuste en el componente raíz de la app: la renderización principal pasó a mostrar la página `Login` en lugar del `SideBar` (cambio temporal/estructural para priorizar flujo de autenticación en desarrollo).

### OBSERVACIONES

- Revisar dónde y cuándo se debe volver a componer `SideBar` (si se utiliza en el layout global, asegurar su inclusión desde `Layout.jsx`).
- Verificar que no queden imports muertos hacia `SideBar` en otros archivos.

---

## RESUMEN GENERAL (período >= 2025-11-11 — commits de patatavolc que afectan frontend)

- 2025-11-12: Cambios en App (priorizar Login).
- 2025-11-13: Introducción de Layout y refactor de estructura / Login.
- 2025-11-17: Desarrollo e integración del Dashboard y componentes asociados (QuickActions, RecentActivity, CurrentOccupancyGauge, DailyBookingsChart).

### SUGERENCIAS GLOBALES

- Ejecutar localmente: npm install && npm run dev en `frontend` y validar el Dashboard con datos reales o mock.
- Revisar package.json si falta alguna dependencia (p. ej. librerías de gráficas).
- Ejecutar una búsqueda rápida de referencias a componentes renombrados/eliminados para evitar imports rotos.
- Añadir (si procede) un README corto en `frontend/src/pages/Dashboard/` explicando qué datos espera cada componente.

---

## FECHA: 11/11/2025

### ARCHIVOS MODIFICADOS

- frontend/src/App.css (modificado)
- frontend/src/components/AuthSidebar.jsx (creado)
- frontend/src/components/InputForm/InputForm.jsx (eliminado)
- frontend/src/components/InputGroup.jsx (creado)
- frontend/src/index.css (modificado)
- frontend/src/pages/Login/Login.jsx (modificado)
- frontend/tailwind.config.js (creado)

### DESCRIPCION

Refactor de la página de Login: introducción de `AuthSidebar` y `InputGroup`, eliminación de `InputForm` y limpieza de estilos específicos de la página. Se adaptaron estilos globales para Tailwind (añadido `tailwind.config.js`).

### OBSERVACIONES

- Revisar referencias a `InputForm` eliminadas y actualizar imports.
- Comprobar que `tailwind.config.js` se carga correctamente y que no hay colisiones de utilidades.

## FECHA: 09/11/2025

### ARCHIVOS MODIFICADOS

- frontend/src/components/InputForm/InputForm.jsx (creado)
- frontend/src/index.css (modificado)
- frontend/src/pages/Login/Login.jsx (modificado)

### DESCRIPCION

Implementación inicial del componente `InputForm` y cambios en la estructura de la página de Login para integrarlo. `InputForm` fue un paso intermedio (sustituido por `InputGroup` en commits posteriores).

### OBSERVACIONES

- Asegurarse de que `InputForm` no quede referenciado tras su eliminación en commits posteriores.

## FECHA: 08/11/2025

### ARCHIVOS MODIFICADOS

- frontend/react/ (múltiples archivos añadidos: .gitignore, README.md, eslint.config.js, index.html, package-lock.json, package.json, public/vite.svg, src/App.css, src/App.jsx, src/assets/react.svg, src/index.css, src/main.jsx, vite.config.js)
- frontend/src/pages/Login/Login.jsx (creado)
- frontend/src/index.css (modificado)
- frontend/vite.config.js (creado / movido)
- .vscode/settings.json (modificado)
- frontend/src/App.jsx (modificado)
- frontend/src/App.css (modificado)
- frontend/react/... (varios archivos añadidos en commit inicial)
- docs/Global.txt, docs/individual/\* (plantillas añadidas)
- .vscode/extensions.json (creado)

### DESCRIPCION

Inicialización del frontend con Vite + React + Tailwind; creación del scaffold en `frontend/react`, movimientos/renombrados a `frontend/` principal, creación de la página Login y ajustes de configuración (ESLint, VSCode settings).

### OBSERVACIONES

- Ejecutar `npm install` en `frontend` y validar `vite`.
- Revisar la inclusión del lockfile (`package-lock.json`) y su impacto en el repositorio.
- Verificar que los movimientos renombrados no dejaron imports rotos (R100/R092/R079 en git log).

## RESUMEN GENERAL

- 2025-11-08: Inicialización y scaffold del frontend (Vite/React/Tailwind). Creación de Login y configuración inicial (ESLint, VSCode, lockfile).
- 2025-11-09: Implementación intermedia de `InputForm` e integración en Login.
- 2025-11-11: Refactor final de Login: `InputGroup` + `AuthSidebar`, eliminación de `InputForm`, adopción de Tailwind.

### OBSERVACIONES GENERALES

- Revisar imports rotos y referencias a componentes eliminados.
- Probar la aplicación localmente (instalar dependencias y ejecutar `vite`).
- Documentar la política de lockfiles/monorepo si se mantiene `frontend/react`.
