import { cpSync, copyFileSync, mkdirSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  server: { host: "0.0.0.0" },
  plugins: [{
    name: "copy-existing-portfolio-assets",
    closeBundle() {
      for (const directory of ["css", "js", "projects", "assets", "my photo"]) {
        cpSync(resolve(directory), resolve("dist", directory), { recursive: true });
      }
      const certificateDir = resolve("dist", "certificates");
      mkdirSync(certificateDir, { recursive: true });
      for (const file of readdirSync(resolve("certificates"))) {
        if (/\.webp$/i.test(file)) copyFileSync(resolve("certificates", file), resolve(certificateDir, file));
      }
    },
  }],
});
