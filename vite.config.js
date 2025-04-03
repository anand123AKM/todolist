import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["/bgs.jpg"],
      manifest: {
        name: "Task Master",
        short_name: "Task Master",
        start_url: "/",
        background_color: "#000000",
        theme_color: "#000000",
        icons: [
          {
            src: "//bgs.jpg",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "//bgs.jpg",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 5000000,
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
});
