import { defineConfig } from "vite";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 3000,
  },
});
