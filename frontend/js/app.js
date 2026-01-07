// Logica para las cosas de pantalla
import { apiFetch } from "./api";
import { getUserData } from "./auth";

export async function getRecursos() {
    const res = await apiFetch("/api/recursos");
    if (!res.ok) {
        const errorBody = await res.text().catch(() => "");
        throw new Error(`Error ${res.status}: ${errorBody}`);
    }

    const data = await res.json();

    const contenedor = document.querySelector("#contenedor-de-recursos");   //cambiar el id
    contenedor.innerHTML = "";

    data.forEach((recurso) => {
        const card = document.createElement("div");
        card.classList.add("nombre-de-la-clase-de-los-recursos");   //cambiar el nombre de la clase
        card.innerHTML = `Aqui metemos el html. Si queremos pillar un dato de recurso podemos hacer <h1>${recurso.nombre}</h1> por ejemplo. Esto ya lo dejo a gusto de los que diseñen`;
        contenedor.appendChild(card);
    });
}

export async function getMisReservas() {
    const user = await getUserData();
    const res = await apiFetch(`/api/reservas/usuario/${user.id_usuario_dni}`);

    if (!res.ok) {
        const errorBody = await res.text().catch(() => "");
        throw new Error(`Error ${res.status}: ${errorBody}`);
    }

    const data = await res.json();

    const contenedor = document.querySelector("#contenedor-de-reservas");   //cambiar el id
    contenedor.innerHTML = "";

    data.forEach((reserva) => {
        const card = document.createElement("div");
        card.classList.add("nombre-de-la-clase-de-las-reservas");   //cambiar el nombre de la clase
        card.innerHTML = `Aqui metemos el html. Si queremos pillar un dato de reserva podemos hacer <h1>${reserva.nombre}</h1> por ejemplo. Esto ya lo dejo a gusto de los que diseñen`;
        contenedor.appendChild(card);
    });
}
