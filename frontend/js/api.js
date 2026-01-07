export async function apiFetch(endpoint, options = {}) {
    const token = localStorage.getItem("nodoLabAuthToken");

    const defaultHeaders = {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
    };

    const config = {
        ...options,
        headers: {
            ...defaultHeaders,
            ...(options.headers || {}),
        },
    };

    const response = await fetch(endpoint, config);

    if (!response.ok) {
        const errorBody = await response.text().catch(() => "");
        throw new Error(`Error ${response.status}: ${errorBody}`);
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
        return response.json();
    }

    return response;
}
