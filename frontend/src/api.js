const API_BASE = "http://localhost:8000";
export async function getRequest(endpoint) {
    try {
        const res = await fetch(`${API_BASE}${endpoint}`,{
            method: "GET",
            credentials: "include"
        });
        
        if (!res.ok) {
            const err = await res.text();
            console.error("GET failed:", err);
            return null;
        }

        const data = await res.json();
        console.log(data);
        return data;

    } catch (err) {
        console.error("Network error:", err);
        return null;
    }
}

export async function postRequest(endpoint, contents) {
    try {
        const res = await fetch(`${API_BASE}${endpoint}`,{
            method: "POST",
            credentials: "include",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(contents || {}),
        });

        if (!res.ok) {
            const err = await res.text();
            console.error("GET failed:", err);
            return null;
        }

        const data = await res.json();
        console.log(data);
        return data;
        
    } catch (err) {
        console.error("Network error:", err);
        return null;
    }
}