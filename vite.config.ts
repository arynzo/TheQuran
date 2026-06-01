import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "android-chrome-192x192.png",
        "android-chrome-512x512.png",
      ],
      manifest: {
        name: "The Quran",
        short_name: "The Quran",
        theme_color: "#1e4729",
        background_color: "#1e4729",
        display: "standalone",
        start_url: "/",
        scope: "/",
        icons: [
          {
            src: "/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/android-chrome-512x512.png", // ✅ fix: 512 wali sahi file
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff,woff2,ttf,otf}"],

        // ✅ Fix 1: file size limit badhao
        maximumFileSizeToCacheInBytes: 20 * 1024 * 1024, // 20MB

        // ✅ Fix 2: surah chunks runtime pe cache karo
        runtimeCaching: [
          {
            urlPattern: /\/assets\/\d+.*\.js$/,
            handler: "CacheFirst",
            options: {
              cacheName: "surah-chunks-cache",
              expiration: {
                maxEntries: 400,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
});
