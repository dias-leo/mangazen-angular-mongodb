import mongoose from 'mongoose';

export async function conectarBanco(): Promise<void> {
  try {
    const urlBanco = process.env.URL_BANCO;

    if (!urlBanco) {
      throw new Error('A variável URL_BANCO não foi definida.');
    }

    await mongoose.connect(urlBanco);
    console.log('Banco de dados conectado com sucesso.');
  } catch (error_) {
    console.error('Erro ao conectar no banco de dados:', error_);
    process.exit(1);
  }
}