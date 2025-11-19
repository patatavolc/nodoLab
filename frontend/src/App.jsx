import "./App.css";
import Login from "./pages/Login/Login.jsx";
import Layout from "./pages/Layout.jsx";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
    const [cookieData, setCookieData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkCookie = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/getCookie", {
                    method: "GET",
                    credentials: "include",
                });
                if (response.ok) {
                    const data = await response.json();
                    setCookieData(data);
                }
            } catch (err) {
                console.error("Error comprobando cookie:", err);
            } finally {
                setLoading(false);
            }
        };
        checkCookie();
    }, []);

    if (loading) return <div>Cargando...</div>;

    return (
        <Router>
            <Routes>
                {/* Ruta pública */}
                <Route path="/login" element={<Login />} />

                {/* Rutas protegidas */}
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute cookieData={cookieData}>
                            <div>Dashboard (crear componente)</div>
                        </PrivateRoute>
                    }
                />

                {/* Ruta por defecto */}
                <Route
                    path="/"
                    element={
                        cookieData ? (
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

function PrivateRoute({ children, cookieData }) {
    return cookieData ? children : <Navigate to="/login" replace />;
}
