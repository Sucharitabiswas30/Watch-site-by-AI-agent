import { sites } from "@openai/sites-vite-plugin";
import { nitro } from "nitro/vite";
import vinext from "vinext";
import { defineConfig } from "vite";

// Netlify runs the Vinext server through Nitro's native Netlify preset.
// Keeping this separate from vite.config.ts preserves the existing
// Cloudflare/Sites development and deployment path.
export default defineConfig({
  plugins: [vinext(), sites(), nitro({ preset: "netlify" })],
});
