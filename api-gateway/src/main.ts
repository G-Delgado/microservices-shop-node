import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createProxyMiddleware } from 'http-proxy-middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Proxy to redirect traffic to microservices
  app.use('/users', createProxyMiddleware({ target: 'http://localhost:3001', changeOrigin: true }));
  app.use('/orders', createProxyMiddleware({ target: 'http://localhost:3002', changeOrigin: true }));
  app.use('/inventory', createProxyMiddleware({ target: 'http://localhost:3003', changeOrigin: true }));
  app.use('/notifications', createProxyMiddleware({ target: 'http://localhost:3004', changeOrigin: true }));

  await app.listen(3000);
}
bootstrap();