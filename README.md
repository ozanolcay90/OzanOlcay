# Ozan Olcay — Professional Portfolio

Personal portfolio showcasing logistics digitalization systems (**L.O.T.** & **Sirius**), career trajectory, methodology, and 11 accredited certifications.

## Local Development

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Deploy to Vercel

This project includes a preconfigured `vercel.json` for Vite static builds and bundles all PDFs, portrait, and certificate preview images under `public/assets/`.

### Option A: Deploy via GitHub + Vercel Dashboard (Recommended)
1. Push this project to a GitHub repository.
2. Sign in to [vercel.com](https://vercel.com) and click **Add New → Project**.
3. Import your GitHub repository.
4. Keep the detected defaults (`Framework: Vite`, `Build Command: npm run build`, `Output Directory: dist`). No environment variables are required.
5. Click **Deploy**. Every future push to `main` automatically updates your live site.

### Option B: Deploy via Vercel CLI
```bash
npm install
npx vercel
```
Follow the prompts to link your Vercel account, then deploy to production:
```bash
npx vercel --prod
```
