import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: "LottieFiles Viewer",
        short_name: "Viewer",
        description: "A viewer for LottieFiles with offline support.",
        start_url: "/",
        display: "standalone",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        icons: [
          {
            src: "icons/vite.svg",
            type: "image/svg+xml",
            sizes: "192x192",
          },
          {
            src: "icons/vite.svg",
            type: "image/svg+xml",
            sizes: "512x512",
          },
        ],
        orientation: "portrait-primary",
      },
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
    }),
  ],
});
