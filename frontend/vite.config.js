import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/ 참고
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Test PWA",
        short_name: "TestPWA",
        theme_color: "#ffffff",
        icons: [
          {
            src: "icons/figma192.png", // img 폴더 내의 임시 파일
            sizes: "192x192",
            type: "image/png",
          },
        ],
        display: "fullscreen" // fullscreen, standalone, minimal-ui, browser
      },
    }),
  ],
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
});
