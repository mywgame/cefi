/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { config } from './server/config/index.ts';
import { logger } from './server/utils/logger.ts';
import { errorHandler } from './server/middlewares/errorHandler.ts';
import { helmetMiddleware, corsMiddleware, rateLimiter } from './server/middlewares/security.ts';
import apiRoutes from './server/routes/index.ts';

async function bootstrap() {
  const app = express();
  const PORT = config.port;

  logger.info(`Starting CeFi Platform Foundation in [${config.nodeEnv}] mode...`);

  // 1. Core Security Middlewares
  app.use(helmetMiddleware);
  app.use(corsMiddleware);
  app.use(rateLimiter(15 * 60 * 1000, 150)); // Global rate limiting

  // 2. Body Parsers
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // 3. API Routes mounted FIRST (Required to prevent Vite SPA routing collision)
  app.use('/api', apiRoutes);

  // 4. Vite Dev Middleware / Production Static Asset Handling
  if (config.nodeEnv !== 'production') {
    logger.info('Mounting Vite middleware for Hot-Module replacement and client builds...');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    logger.info('Mounting production static assets build directories...');
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // 5. Centralized Error Handler (Mounted last)
  app.use(errorHandler);

  // 6. Bind and Listen
  const server = app.listen(PORT, '0.0.0.0', () => {
    logger.info(`Server successfully bound to host 0.0.0.0, listening on port ${PORT}`);
  });

  // Graceful shutdown handling
  const shutdown = () => {
    logger.info('Received shutdown signal. Commencing graceful termination...');
    server.close(() => {
      logger.info('Express server successfully closed. Process exiting.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}

bootstrap().catch((error) => {
  logger.error('Fatal initialization error during bootstrap sequence:', error);
  process.exit(1);
});
