import { Request, Response } from 'express';
import { ILivroCriacao } from '../models/livro.model';
import * as livroService from '../services/livro.service';

interface IListarLivrosQuery {
  pagina?: string;
  limite?: string;
}

export async function listarLivros(
  req: Request<{}, {}, {}, IListarLivrosQuery>,
  res: Response
) {
  try {
    const pagina = Math.max(1, Number.parseInt(req.query.pagina ?? '1', 10) || 1);
    const limiteBruto = Number.parseInt(req.query.limite ?? '8', 10) || 8;
    const limite = Math.min(50, Math.max(1, limiteBruto));

    const livros = await livroService.listarLivros(pagina, limite);
    return res.status(200).json(livros);
  } catch (error_) {
    console.error(error_);
    return res.status(500).json({ mensagem: 'Erro ao listar livros' });
  }
}

export async function buscarLivroPorId(
  req: Request<{ id: string }>,
  res: Response
) {
  try {
    const { id } = req.params;

    const livro = await livroService.buscarLivroPorId(id);

    if (!livro) {
      return res.status(404).json({ mensagem: 'Livro não encontrado' });
    }

    return res.status(200).json(livro);
  } catch (error_) {
    console.error(error_);
    return res.status(500).json({ mensagem: 'Erro ao buscar livro' });
  }
}

export async function criarLivro(req: Request<{}, {}, ILivroCriacao>, res: Response) {
  try {
    const novoLivro = await livroService.criarLivro(req.body);
    return res.status(201).json(novoLivro);
  } catch (error_) {
    const erro = error_ as { code?: number; message?: string };

    if (erro.code === 11000) {
      return res.status(400).json({ mensagem: 'ISBN já cadastrado' });
    }

    console.error(error_);
    return res.status(400).json({
      mensagem: 'Erro ao criar livro',
      erro: erro.message
    });
  }
}

export async function atualizarLivro(
  req: Request<{ id: string }, {}, Partial<ILivroCriacao>>,
  res: Response
) {
  try {
    const { id } = req.params;

    const livroAtualizado = await livroService.atualizarLivro(id, req.body);

    if (!livroAtualizado) {
      return res.status(404).json({ mensagem: 'Livro não encontrado' });
    }

    return res.status(200).json(livroAtualizado);
  } catch (error_) {
    const erro = error_ as { code?: number; message?: string };

    if (erro.code === 11000) {
      return res.status(400).json({ mensagem: 'ISBN já cadastrado' });
    }

    console.error(error_);
    return res.status(400).json({
      mensagem: 'Erro ao atualizar livro',
      erro: erro.message
    });
  }
}

export async function deletarLivro(
  req: Request<{ id: string }>,
  res: Response
) {
  try {
    const { id } = req.params;

    const livro = await livroService.deletarLivro(id);

    if (!livro) {
      return res.status(404).json({ mensagem: 'Livro não encontrado' });
    }

    return res.status(200).json({ mensagem: 'Livro desativado com sucesso' });
  } catch (error_) {
    console.error(error_);
    return res.status(500).json({ mensagem: 'Erro ao deletar livro' });
  }
}