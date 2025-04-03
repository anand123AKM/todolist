import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "bgs.jpg",
        "favicon.ico",
        "robots.txt",
        "apple-touch-icon.png",
      ],
      manifest: {
        name: "Task Master",
        short_name: "Task Master",
        description: "Manage your tasks efficiently with Task Master",
        start_url: "/",
        display: "standalone",
        orientation: "portrait",
        background_color: "#000000",
        theme_color: "#000000",
        icons: [
          {
            src: "bgs.jpg",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "bgs.jpg",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 5000000,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
            },
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "images-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
            },
          },
        ],
        navigateFallback: "index.html",
      },
      devOptions: {
        enabled: true,
        type: "module",
      },
    }),
  ],
});
