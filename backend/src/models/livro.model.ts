import mongoose, { Schema, Types } from 'mongoose';

export interface ILivro {
  _id: Types.ObjectId;
  titulo: string;
  subtitulo: string;
  isbn13: string;
  preco: number;
  estoque: number;
  categorias: string[];
  capa: {
    url: string;
    textoAlternativo: string;
  };
  dataPublicacao: Date;
  ativo: boolean;
}

const capaSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
      trim: true
    },
    textoAlternativo: {
      type: String,
      required: true,
      trim: true
    }
  },
  { _id: false }
);

const livroSchema = new Schema<ILivro>(
  {
    titulo: {
      type: String,
      required: true,
      trim: true
    },
    subtitulo: {
      type: String,
      required: true,
      trim: true
    },
    isbn13: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: /^\d{13}$/
    },
    preco: {
      type: Number,
      required: true,
      min: 0
    },
    estoque: {
      type: Number,
      required: true,
      min: 0
    },
    categorias: {
      type: [String],
      default: []
    },
    capa: {
      type: capaSchema,
      required: true
    },
    dataPublicacao: {
      type: Date,
      required: true
    },
    ativo: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export const Livro = mongoose.model<ILivro>(
  'Livro',
  livroSchema,
  'livros'
);