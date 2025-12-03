# FECHA: 03/12/2025

### ARCHIVOS MODIFICADOS

-   backend/controllers/dashboard-controller.js (creado/modificado)

### DESCRIPCION

Se creó el controlador del dashboard con funciones para obtener datos agregados:

-   `getDashboardData`: función principal que obtiene datos generales del dashboard.
-   `getDashboardResumen`: función para obtener resumen de estadísticas del dashboard.
-   `getDashboardFinanzas`: función para obtener datos financieros y refactorización de otros controladores para mejorar la organización del código.

### OBSERVACIONES

-   Validar que las funciones del controlador se integren correctamente con las rutas definidas en `dashboard.routes.js`.
-   Comprobar que los servicios invocados desde el controlador devuelvan los datos en el formato esperado.
-   Probar los endpoints del dashboard con datos reales para verificar el correcto funcionamiento.

---

# FECHA: 25/11/2025

### ARCHIVOS MODIFICADOS

-   backend/routes/dashboard.routes.js (creado/modificado)
-   backend/services/reservas.service.js (modificado)
-   backend/services/usuarios.service.js (modificado)
-   backend/services/recursos.service.js (modificado)

### DESCRIPCION

Implementación de rutas y servicios para el dashboard del backend:

**Rutas:**

-   Creación inicial de `dashboard.routes.js` con ruta para obtener datos del dashboard.
-   Ampliación de rutas con endpoints adicionales para resumen y finanzas del dashboard.

**Servicios:**

-   `reservas.service.js`:
    -   Función para obtener reservas recientes (útil para mostrar actividad reciente en dashboard).
    -   Función para obtener estadísticas de reservas por estado (pendiente, confirmada, cancelada, etc.).
-   `usuarios.service.js`: Función para obtener usuarios más activos por número de reservas.
-   `recursos.service.js`:
    -   Función para obtener recursos más reservados.
    -   Función para obtener tasa de ocupación de los recursos.

### OBSERVACIONES

-   Verificar que los procedimientos almacenados en la base de datos estén correctamente implementados para soportar estas funciones.
-   Comprobar el rendimiento de las consultas, especialmente las de estadísticas y agregaciones.
-   Validar que los datos devueltos por los servicios sean consistentes con los requerimientos del frontend.
-   Añadir manejo de errores apropiado en cada función de servicio.

---

# FECHA: 21-24/11/2025

### ARCHIVOS MODIFICADOS

-   frontend/src/components/Financials/FinancialStats.jsx (creado)
-   frontend/src/components/Financials/InvoiceTable.jsx (creado)
-   frontend/src/components/Financials/RevenueChart.jsx (creado)
-   frontend/src/components/Financials/FinancialHeader.jsx (creado)
-   frontend/src/components/Financials/FinancialFilter.jsx (creado)
-   frontend/src/pages/Financials/Financials.jsx (creado/modificado)

### DESCRIPCION

Desarrollo completo de la página de Finanzas (Financials) con sus componentes asociados:

-   `FinancialStats.jsx`: Componente para mostrar métricas financieras clave (ingresos, gastos, balance, etc.).
-   `InvoiceTable.jsx`: Tabla para visualizar facturas con información detallada.
-   `RevenueChart.jsx`: Gráfico para visualización de ingresos/revenue a lo largo del tiempo.
-   `FinancialHeader.jsx`: Encabezado de la página de finanzas con título y acciones principales.
-   `FinancialFilter.jsx`: Componente de filtros para búsqueda y filtrado de datos financieros (por fecha, estado, etc.).
-   `Financials.jsx`: Página principal que integra todos los componentes anteriores, maneja el estado y realiza fetch de datos financieros desde la API.

### OBSERVACIONES

-   Validar que el endpoint de API para datos financieros esté implementado y devuelva el formato esperado.
-   Comprobar que la librería de gráficos utilizada en `RevenueChart` esté incluida en package.json.
-   Revisar la integración de filtros y su impacto en las consultas a la API.
-   Probar la visualización con diferentes conjuntos de datos (vacíos, con muchos registros, etc.).
-   Verificar el formato de moneda y fechas según la localización requerida.

---

# FECHA: 20/11/2025

### ARCHIVOS MODIFICADOS

-   frontend/src/pages/Resources/Resources.jsx (creado)
-   frontend/src/components/Resources/ResourceHeader.jsx (creado)
-   frontend/src/components/Resources/ResourceFilters.jsx (creado)
-   frontend/src/components/Resources/ResourceCard.jsx (creado)
-   frontend/src/components/Resources/ResourceGrid.jsx (creado)

### DESCRIPCION

Implementación completa de la página de Recursos (Resources) con funcionalidad de filtrado y eliminación:

-   `ResourceHeader.jsx`: Componente de encabezado para la página de recursos.
-   `ResourceFilters.jsx`: Componente de filtros con funcionalidad de búsqueda y filtrado por diferentes criterios.
-   `ResourceCard.jsx`: Tarjeta individual de recurso con placeholders de imagen y badges de estado (disponible, ocupado, mantenimiento, etc.).
-   `ResourceGrid.jsx`: Grid/cuadrícula para mostrar las tarjetas de recursos en layout responsivo.
-   `Resources.jsx`: Página principal que integra todos los componentes, maneja el estado de recursos, implementa la lógica de filtrado y eliminación de recursos.

### OBSERVACIONES

-   Verificar que el endpoint de API para recursos (/api/recursos o similar) esté funcionando correctamente.
-   Comprobar que la funcionalidad de eliminación incluya confirmación del usuario antes de ejecutar.
-   Validar que los filtros funcionen correctamente con diferentes combinaciones de criterios.
-   Revisar el manejo de imágenes placeholder y considerar implementar carga de imágenes reales.
-   Probar la responsividad del grid en diferentes tamaños de pantalla.

---

# FECHA: 19/11/2025

### ARCHIVOS MODIFICADOS

-   frontend/src/pages/Users/Users.jsx (creado/modificado)
-   frontend/src/components/Users/UserHeader.jsx (creado)
-   frontend/src/components/Users/UserFilters.jsx (creado)
-   frontend/src/components/Users/UserTable.jsx (creado/modificado)

### DESCRIPCION

Desarrollo de la página de gestión de usuarios (Users) con sus componentes asociados:

-   `UserHeader.jsx`: Componente de encabezado para la página de usuarios.
-   `UserFilters.jsx`: Componente de filtros para búsqueda y filtrado de usuarios.
-   `UserTable.jsx`: Tabla completa de usuarios con columnas para: id_usuario_dni, nombre_completo, email, teléfono y rol. Se eliminaron campos de estado y avatar que estaban en versiones previas.
-   `Users.jsx`: Página principal que integra los componentes anteriores y maneja el estado de la lista de usuarios.

**Correcciones realizadas:**

-   Fix en `Users.jsx`: ajuste menor de implementación.
-   Fix importante: cambio de campo `id` a `id_usuario_dni` para alinearse con el esquema de base de datos. Se utilizan todos los campos relevantes (nombre_completo, email, telefono, rol) y se eliminaron campos no utilizados (estado, avatar).

### OBSERVACIONES

-   Verificar que el endpoint de API para usuarios devuelva los campos esperados: id_usuario_dni, nombre_completo, email, telefono, rol.
-   Comprobar que los filtros funcionen correctamente con los datos reales.
-   Validar que la tabla maneje correctamente casos de listas vacías o errores de API.
-   Revisar permisos y roles para determinar qué usuarios pueden acceder a esta página de gestión.
-   Considerar añadir funcionalidad de edición/eliminación de usuarios si es requerido.

---

# FECHA: 17/11/2025

### ARCHIVOS MODIFICADOS

-   frontend/src/pages/Dashboard/Dashboard.jsx (modificado)
-   frontend/src/components/Dashboard/QuickActions.jsx (creado)
-   frontend/src/components/Dashboard/RecentActivity.jsx (creado)
-   frontend/src/components/Dashboard/CurrentOccupancyGauge.jsx (creado)
-   frontend/src/components/Dashboard/DailyBookingsChart.jsx (creado) <!-- creado según mensaje de commit -->

### DESCRIPCION

Se añadió e integró la mayor parte del Dashboard del frontend.

-   `Dashboard.jsx` ahora realiza fetch a la API (API_BASE_URL: /api/dashboard) y centraliza la carga de: stats, dailyBookings, occupancy y recentActivity. Maneja estados de carga y error.
-   Nuevos componentes añadidos para componer la página:
    -   `QuickActions.jsx`: acciones rápidas (gestión de reservas, pagos, directorio, anuncios).
    -   `RecentActivity.jsx`: listado de actividad con iconos y colores por tipo.
    -   `CurrentOccupancyGauge.jsx`: medidor visual de porcentaje de ocupación.
    -   `DailyBookingsChart.jsx`: componente para visualización de reservas diarias (creado según mensaje de commit).

El Dashboard renderiza tarjetas de estadísticas (StatCard), gráfico de reservas diarias, medidor de ocupación, actividad reciente y el panel de acciones rápidas.

### OBSERVACIONES

-   Validar que el endpoint API (/api/dashboard) devuelva las claves esperadas: stats (array de 4), dailyBookings, occupancy (num), recentActivity (array).
-   Comprobar rutas e imports relativos (p. ej. Layout importado desde ../Layout.jsx en Dashboard).
-   Revisar dependencias (heroicons ya usado; si `DailyBookingsChart` usa librería de charts, agregarla a package.json).
-   Probar la animación del gauge y el comportamiento con datos nulos/vacíos (fallbacks ya contemplados en el Dashboard).
-   Añadir tests o stubs para la API del dashboard en entorno de desarrollo si no existe backend listo.

---

# FECHA: 13/11/2025

### ARCHIVOS MODIFICADOS

-   frontend/src/Layout.jsx (creado) <!-- creado en commit "Layour component" -->
-   frontend/src/App.jsx (modificado)
-   frontend/src/pages/Login/Login.jsx (modificado)

### DESCRIPCION

Se introdujo un componente de Layout para estandarizar la estructura de páginas (header/sidebar/contenido) y se realizaron refactors en la estructura de la aplicación para usar ese layout. Además, se limpiaron y ajustaron estilos/estructura de la página de Login para encajar en la nueva organización de componentes.

### OBSERVACIONES

-   Confirmar la ubicación exacta de `Layout.jsx` y que todas las páginas lo consuman correctamente (Dashboard importa ../Layout.jsx).
-   Revisar que los cambios en `App.jsx` y Login no rompan las rutas ni el flujo de autenticación.
-   Actualizar documentación o README si la estructura de carpetas/entrypoints cambió.

---

# FECHA: 12/11/2025

### ARCHIVOS MODIFICADOS

-   frontend/src/App.jsx (modificado)

### DESCRIPCION

Ajuste en el componente raíz de la app: la renderización principal pasó a mostrar la página `Login` en lugar del `SideBar` (cambio temporal/estructural para priorizar flujo de autenticación en desarrollo).

### OBSERVACIONES

-   Revisar dónde y cuándo se debe volver a componer `SideBar` (si se utiliza en el layout global, asegurar su inclusión desde `Layout.jsx`).
-   Verificar que no queden imports muertos hacia `SideBar` en otros archivos.

---

## RESUMEN GENERAL (período >= 2025-11-11 — commits de Eder)

-   2025-11-12: Cambios en App (priorizar Login).
-   2025-11-13: Introducción de Layout y refactor de estructura / Login.
-   2025-11-17: Desarrollo e integración del Dashboard y componentes asociados (QuickActions, RecentActivity, CurrentOccupancyGauge, DailyBookingsChart).
-   2025-11-19: Implementación completa de la página de gestión de Usuarios (Users) con componentes de header, filtros y tabla.
-   2025-11-20: Desarrollo de la página de Recursos (Resources) con funcionalidad de filtrado, visualización en grid y eliminación.
-   2025-11-21 a 2025-11-24: Creación de la página de Finanzas (Financials) con estadísticas, tabla de facturas, gráficos de ingresos y filtros.
-   2025-11-25: Implementación de rutas y servicios del dashboard en backend (reservas recientes, estadísticas, usuarios activos, recursos más reservados, tasa de ocupación).
-   2025-12-03: Creación del controlador del dashboard con funciones para datos generales, resumen y finanzas.

### SUGERENCIAS GLOBALES

-   Ejecutar localmente: npm install && npm run dev en `frontend` y validar las nuevas páginas (Users, Resources, Financials, Dashboard) con datos reales o mock.
-   Revisar package.json si falta alguna dependencia (p. ej. librerías de gráficas para RevenueChart).
-   Ejecutar una búsqueda rápida de referencias a componentes renombrados/eliminados para evitar imports rotos.
-   Validar que todos los endpoints de backend estén correctamente implementados y devuelvan los formatos esperados por el frontend.
-   Probar la integración completa entre frontend y backend, especialmente para las páginas de Dashboard y Financials.
-   Verificar el rendimiento de las consultas de estadísticas y agregaciones en el backend.
-   Añadir manejo de errores consistente en todos los servicios y controladores del backend.

---

## FECHA: 11/11/2025

### ARCHIVOS MODIFICADOS

-   frontend/src/App.css (modificado)
-   frontend/src/components/AuthSidebar.jsx (creado)
-   frontend/src/components/InputForm/InputForm.jsx (eliminado)
-   frontend/src/components/InputGroup.jsx (creado)
-   frontend/src/index.css (modificado)
-   frontend/src/pages/Login/Login.jsx (modificado)
-   frontend/tailwind.config.js (creado)

### DESCRIPCION

Refactor de la página de Login: introducción de `AuthSidebar` y `InputGroup`, eliminación de `InputForm` y limpieza de estilos específicos de la página. Se adaptaron estilos globales para Tailwind (añadido `tailwind.config.js`).

### OBSERVACIONES

-   Revisar referencias a `InputForm` eliminadas y actualizar imports.
-   Comprobar que `tailwind.config.js` se carga correctamente y que no hay colisiones de utilidades.

## FECHA: 09/11/2025

### ARCHIVOS MODIFICADOS

-   frontend/src/components/InputForm/InputForm.jsx (creado)
-   frontend/src/index.css (modificado)
-   frontend/src/pages/Login/Login.jsx (modificado)

### DESCRIPCION

Implementación inicial del componente `InputForm` y cambios en la estructura de la página de Login para integrarlo. `InputForm` fue un paso intermedio (sustituido por `InputGroup` en commits posteriores).

### OBSERVACIONES

-   Asegurarse de que `InputForm` no quede referenciado tras su eliminación en commits posteriores.

## FECHA: 08/11/2025

### ARCHIVOS MODIFICADOS

-   frontend/react/ (múltiples archivos añadidos: .gitignore, README.md, eslint.config.js, index.html, package-lock.json, package.json, public/vite.svg, src/App.css, src/App.jsx, src/assets/react.svg, src/index.css, src/main.jsx, vite.config.js)
-   frontend/src/pages/Login/Login.jsx (creado)
-   frontend/src/index.css (modificado)
-   frontend/vite.config.js (creado / movido)
-   .vscode/settings.json (modificado)
-   frontend/src/App.jsx (modificado)
-   frontend/src/App.css (modificado)
-   frontend/react/... (varios archivos añadidos en commit inicial)
-   docs/Global.txt, docs/individual/\* (plantillas añadidas)
-   .vscode/extensions.json (creado)

### DESCRIPCION

Inicialización del frontend con Vite + React + Tailwind; creación del scaffold en `frontend/react`, movimientos/renombrados a `frontend/` principal, creación de la página Login y ajustes de configuración (ESLint, VSCode settings).

### OBSERVACIONES

-   Ejecutar `npm install` en `frontend` y validar `vite`.
-   Revisar la inclusión del lockfile (`package-lock.json`) y su impacto en el repositorio.
-   Verificar que los movimientos renombrados no dejaron imports rotos (R100/R092/R079 en git log).

## RESUMEN GENERAL

-   2025-11-08: Inicialización y scaffold del frontend (Vite/React/Tailwind). Creación de Login y configuración inicial (ESLint, VSCode, lockfile).
-   2025-11-09: Implementación intermedia de `InputForm` e integración en Login.
-   2025-11-11: Refactor final de Login: `InputGroup` + `AuthSidebar`, eliminación de `InputForm`, adopción de Tailwind.

### OBSERVACIONES GENERALES

-   Revisar imports rotos y referencias a componentes eliminados.
-   Probar la aplicación localmente (instalar dependencias y ejecutar `vite`).
-   Documentar la política de lockfiles/monorepo si se mantiene `frontend/react`.
