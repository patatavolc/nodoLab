import "./App.css";
import Login from "./pages/Login/Login.jsx";
import Layout from "./pages/Layout.jsx";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
    const [tokenData, setTokenData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkToken = async () => {
            try {
                const token = localStorage.getItem("nodolab_auth_token");
                    setTokenData(token);
                
            } catch (err) {
                console.error("Error comprobando token:", err);
            } finally {
                setLoading(false);
            }
        };
        checkToken();
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
                        <PrivateRoute tokenData={tokenData}>
                            <div>Dashboard (crear componente)</div>
                        </PrivateRoute>
                    }
                />

                {/* Ruta por defecto */}
                <Route
                    path="/"
                    element={
                        tokenData ? (
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

function PrivateRoute({ children, tokenData }) {
    return tokenData ? children : <Navigate to="/login" replace />;
}
