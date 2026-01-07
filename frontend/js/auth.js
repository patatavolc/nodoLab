// Logica de login, registro y guardar token
import { apiFetch } from "./api";

export async function login(nameOrMail, password) {
    const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: nameOrMail,
            password: password,
        }),
    });
    if (!res.ok) {
        const errorBody = await res.text().catch(() => "");
        throw new Error(`Error ${res.status}: ${errorBody}`);
    }

    const data = await res.json();
    localStorage.setItem("nodoLabAuthToken", data.token);

    if (data) window.location.replace("/dashboard.html");
    return data ?? new Error("Error desconocido xd");
}

export async function getUserData() {
    const data = await apiFetch("/api/userdata");
    return data.user;
}
