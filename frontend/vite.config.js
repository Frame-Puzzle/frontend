import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import manifest from "./manifest.json";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest,
      // 배포 pwa 환경 변경에 따른 캐시 설정 오류 잡기 workbox
      // cleanupOutdatedCaches: 이전 버전의 캐시 자동 정리
      // clientsClaim: sw 활성화 이 후, 모든 클라이언트 페이지 제어
      // skipWaiting: 새로운 sw가 설치 시 바로 활성화
      workbox: {
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
      },
      // devOptions 설정 시, npm run dev 실행하면 pwa만 build 환경으로 새로 dev-dist 생성, 배포 환경에서는 사용 안함
      // devOptions: {
      //   enabled: true,
      // },
    }),
  ],
  server: {
    port: 3000,
    host: "0.0.0.0",
  },
});
