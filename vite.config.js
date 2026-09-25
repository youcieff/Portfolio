import { defineConfig } from "vite";
import { cpSync } from "node:fs";
import { resolve } from "node:path";

export default defineConfig({
  server: { host: "0.0.0.0" },
  plugins: [{
    name: "copy-existing-portfolio-assets",
    closeBundle() {
      for (const directory of ["css", "js", "projects", "assets", "my photo"]) {
        cpSync(resolve(directory), resolve("dist", directory), { recursive: true });
      }
    },
  }],
});
