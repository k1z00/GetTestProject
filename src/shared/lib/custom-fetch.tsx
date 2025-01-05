import { ofetch } from "ofetch";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Кастомный экземпляр ofetch
const customFetch = ofetch.create({
    baseURL: BASE_URL,
    headers: new Headers({
        "Content-Type": "application/json",
    }),
    onRequest({ options }) {
        const token = localStorage.getItem("token");
        if (token) {
            const headers = new Headers(options.headers);
            headers.set("x-authorizaition", `Bearer ${token}`)
            options.headers = headers;
        }
    },
});


export default customFetch