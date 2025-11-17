import "./App.css";
import Login from "./pages/Login/Login.jsx";
import Layout from "./pages/Layout.jsx";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta pública */}
        <Route path="/login" element={<Login />} />

        {/* Rutas protegidas */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <div>Dashboard (crear componente)</div>
            </PrivateRoute>
          }
        />

        {/* Añade más rutas protegidas aquí */}
        {/* <Route 
          path="/otra-pagina" 
          element={
            <PrivateRoute>
              <OtraPagina />
            </PrivateRoute>
          } 
        /> */}

        {/* Ruta por defecto: redirige a login si no hay token, sino a dashboard */}
        <Route
          path="/"
          element={
            localStorage.getItem("token") ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Ruta 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

// Componente para proteger rutas privadas
function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
}
