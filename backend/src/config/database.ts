import mongoose from 'mongoose';

export async function conectarBanco(): Promise<void> {
  try {
    const urlBanco = process.env.URL_BANCO;

    if (!urlBanco) {
      throw new Error('A variável URL_BANCO não foi definida.');
    }

    await mongoose.connect(urlBanco);
    console.log('Banco de dados conectado com sucesso.');
  } catch (erro) {
    console.error('Erro ao conectar no banco de dados:', erro);
    process.exit(1);
  }
}