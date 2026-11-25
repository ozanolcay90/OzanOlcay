import 'dotenv/config';
import express, { type Request, type Response } from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer as createViteServer } from 'vite';
import { GeminiChatError, streamPortfolioChat } from './server/geminiChatService';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';

async function startServer() {
  const app = express();

  app.use(express.json({ limit: '256kb' }));

  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok' });
  });

  app.post('/api/chat', async (req: Request, res: Response) => {
    const body = req.body as { message?: unknown; history?: unknown; mode?: unknown } | undefined;
    const message = typeof body?.message === 'string' ? body.message : '';

    if (!message.trim()) {
      res.status(400).json({ error: 'Please enter a question or comparison request.' });
      return;
    }

    res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no');
    res.flushHeaders?.();

    let closed = false;
    res.on('close', () => {
      if (!res.writableEnded) {
        closed = true;
      }
    });

    try {
      for await (const chunk of streamPortfolioChat({
        message,
        history: body?.history,
        mode: body?.mode,
      })) {
        if (closed) break;
        res.write(`data: ${JSON.stringify({ text: chunk })}\n\n`);
      }

      if (!closed) {
        res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
        res.end();
      }
    } catch (err) {
      const errorMessage =
        err instanceof GeminiChatError
          ? err.message
          : 'Unable to complete the request right now. Please try again.';
      const status = err instanceof GeminiChatError ? err.status : 500;

      if (!closed) {
        res.write(`data: ${JSON.stringify({ error: errorMessage, status })}\n\n`);
        res.end();
      }
    }
  });

  if (isProduction) {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('/{*splat}', (_req: Request, res: Response) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
