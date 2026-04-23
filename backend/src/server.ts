import dotenv from 'dotenv';
import app from './app';
import { conectarBanco } from './config/database';

dotenv.config();

const porta = process.env.PORT;

async function iniciarServidor(): Promise<void> {
  await conectarBanco();

  app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
  });
}

iniciarServidor();