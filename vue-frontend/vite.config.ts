import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  plugins: [vue()],
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 3000,
  },
});
