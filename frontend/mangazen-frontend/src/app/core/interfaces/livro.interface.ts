export interface ICapaLivro {
  url: string;
  textoAlternativo: string;
}

export interface ILivro {
  _id: string;
  titulo: string;
  subtitulo: string;
  isbn13: string;
  preco: number;
  estoque: number;
  categorias: string[];
  capa: ICapaLivro;
  dataPublicacao: string;
  ativo: boolean;
}

export type ILivroCriacao = Omit<ILivro, '_id' | 'ativo'>;
export type ILivroAtualizacao = Partial<ILivroCriacao>;