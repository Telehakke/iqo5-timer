import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        outDir: "docs",
        assetsInlineLimit: () => true,
    },
    server: {
        host: true,
    },
    base: "/iqo5-timer",
});
