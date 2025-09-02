import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { swaggerUi, swaggerSpec } from './config/swagger.js';
import v1Routes from './routes/v1/index.js';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/v1', v1Routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal Server Error' });
});

export default app;

