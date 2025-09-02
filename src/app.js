import express from 'express';
import dotenv from 'dotenv';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import authRoutes from './routes/auth.routes.js';
import { connectDB } from './config/db.js';
import { connectRedis } from './config/redis.js';

dotenv.config();

const app = express();
app.use(express.json());

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Hikaweb API',
      version: '1.0.0'
    }
  },
  apis: ['./src/routes/*.js']
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/v1/auth', authRoutes);

const PORT = process.env.PORT || 3000;

async function start() {
  await connectDB();
  await connectRedis();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

start();
