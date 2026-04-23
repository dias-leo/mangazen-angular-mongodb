import { Livro, ILivro } from '../models/livro.model';

export async function listarLivros(): Promise<ILivro[]> {
  return await Livro.find({ ativo: true });
}

export async function buscarLivroPorId(id: string): Promise<ILivro | null> {
  return await Livro.findById(id);
}

export async function criarLivro(dadosLivro: Omit<ILivro, '_id'>): Promise<ILivro> {
  const livro = await Livro.create(dadosLivro);
  return livro;
}

export async function atualizarLivro(
  id: string,
  dadosAtualizacao: Partial<Omit<ILivro, '_id'>>
): Promise<ILivro | null> {
  return await Livro.findByIdAndUpdate(id, dadosAtualizacao, {
    returnDocument: 'after',
    runValidators: true
  });
}

export async function deletarLivro(id: string): Promise<ILivro | null> {
  return await Livro.findByIdAndUpdate(
    id,
    { ativo: false },
    { returnDocument: 'after' }
  );
}