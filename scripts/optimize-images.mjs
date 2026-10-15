import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const source = path.resolve("certificates", "Youssef Maged Hanna.png");
const outputDirectory = path.resolve("public", "images", "certificates");
const fullSize = path.join(outputDirectory, "kimmit-mern-certificate.webp");
const thumbnail = path.join(outputDirectory, "kimmit-mern-certificate-800.webp");

await mkdir(outputDirectory, { recursive: true });

const image = sharp(source).rotate();
const fullResult = await image
  .clone()
  .resize({ width: 1600, withoutEnlargement: true })
  .webp({ quality: 82, effort: 6 })
  .toFile(fullSize);
const thumbResult = await image
  .clone()
  .resize({ width: 800, withoutEnlargement: true })
  .webp({ quality: 82, effort: 6 })
  .toFile(thumbnail);

console.info("Optimized the full certificate and thumbnail without cropping:");
console.info(`${fullSize} (${fullResult.width}×${fullResult.height})`);
console.info(`${thumbnail} (${thumbResult.width}×${thumbResult.height})`);
