import { defineConfig, loadEnv } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import express from "vite3-plugin-express";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, path.resolve(process.cwd(), "../server/"), "");

  return {
    server: {
      port: 4000,
    },
    define: {
      "process.env.PORT": JSON.stringify(env.PORT),
    },
    plugins: [react(), express("../server/server.js")],
  };
});
