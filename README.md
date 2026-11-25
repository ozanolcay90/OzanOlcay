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
4. Keep the detected defaults (`Framework: Vite`, `Build Command: npm run build`, `Output Directory: dist`).
5. Under **Environment Variables**, add `GEMINI_API_KEY` (your Google AI Studio Gemini API key) so the right-side `/api/chat` Gemini portfolio assistant works live on Vercel.
6. Click **Deploy**. Every future push to `main` automatically updates your live site.

> **Customizing your portfolio database:** Edit `server/portfolio-notes.md` (or set `GEMINI_CUSTOM_KNOWLEDGE` in your environment variables) to expand the personal notes and context used by the Gemini assistant.

### Option B: Deploy via Vercel CLI
```bash
npm install
npx vercel
```
Follow the prompts to link your Vercel account, then deploy to production:
```bash
npx vercel --prod
```
