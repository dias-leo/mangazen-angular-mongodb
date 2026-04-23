import { Livro, ILivro, ILivroAtualizacao, ILivroCriacao } from '../models/livro.model';

export interface IPaginacaoLivros {
  itens: ILivro[];
  total: number;
  pagina: number;
  limite: number;
  totalPaginas: number;
}

export async function listarLivros(
  pagina: number,
  limite: number
): Promise<IPaginacaoLivros> {
  const skip = (pagina - 1) * limite;

  const [itens, total] = await Promise.all([
    Livro.find({ ativo: true })
      .sort({ dataPublicacao: -1, _id: -1 })
      .skip(skip)
      .limit(limite),
    Livro.countDocuments({ ativo: true })
  ]);

  const totalPaginas = Math.max(1, Math.ceil(total / limite));

  return {
    itens,
    total,
    pagina,
    limite,
    totalPaginas
  };
}

export async function buscarLivroPorId(id: string): Promise<ILivro | null> {
  return await Livro.findById(id);
}

export async function criarLivro(dadosLivro: ILivroCriacao): Promise<ILivro> {
  const livro = await Livro.create(dadosLivro);
  return livro;
}

export async function atualizarLivro(
  id: string,
  dadosAtualizacao: ILivroAtualizacao
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