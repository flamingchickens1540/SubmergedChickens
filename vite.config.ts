import { sveltekit } from "@sveltejs/kit/vite"
import { defineConfig } from "vite"
import webSocketServer from "./ws.js"

export default defineConfig({
    plugins: [sveltekit(), webSocketServer],
    server: {
        fs: {
            allow: ["./"],
        },
        allowedHosts: true,
    },
})
