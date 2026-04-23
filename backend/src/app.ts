import express, { Request, Response } from 'express';
import cors from 'cors';
import livroRoutes from './routes/livro.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_req: Request, res: Response) => {
  return res.status(200).json({
    message: 'API funcionando'
  });
});

app.use('/livros', livroRoutes);

export default app;