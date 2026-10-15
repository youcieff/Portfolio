# Youssef Maged Hanna — Portfolio

A static, single-page portfolio built with Next.js App Router, React, TypeScript, Tailwind CSS v4, and Motion. Project content is kept in typed modules under `data/`; screenshots and profile imagery are served from `public/`.

## Local development

```bash
npm install
Copy-Item .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. The form forwards submissions through the server route to FormSubmit. `FORMSUBMIT_EMAIL` in `.env.local` or the hosting provider's environment settings can override the recipient; when it is unset, the address in `data/site.ts` is used. The first FormSubmit activation email must be confirmed before messages arrive.

The contact endpoint validates every field, checks a honeypot, and applies a small in-memory per-IP rate limit. On a serverless deployment, that limit is per running instance and is a basic abuse deterrent, not shared global storage.

## Production

```bash
npm run lint
npm run typecheck
npm run build
npm run start
```

Deploy to Vercel using the repository root as the project root. Set `FORMSUBMIT_EMAIL` in **Project Settings → Environment Variables** only if the recipient should differ from the address in `data/site.ts`; redeploy after changing it. No custom build command is required. Set `metadataBase` in `data/site.ts` to the production domain if it changes.

## Project images and certificate

Project screenshots are under `public/projects/` and remain WebP. The certificate is served as WebP from `public/certificates/`; `npm run optimize:images` recreates its 1600px image and 800px preview from the ignored source file `certificates/Youssef Maged Hanna.png`.

## Print résumé

Use **Download PDF / Print** in the résumé section, then select **Save as PDF** in the browser's print dialog. Print-only contact details and clean A4 print styles are included.
