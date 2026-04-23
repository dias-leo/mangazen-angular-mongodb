import { Request, Response } from 'express';
import * as livroService from '../services/livro.service';

export async function listarLivros(req: Request, res: Response) {
  try {
    const livros = await livroService.listarLivros();
    return res.status(200).json(livros);
  } catch (erro) {
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
  } catch (erro) {
    return res.status(500).json({ mensagem: 'Erro ao buscar livro' });
  }
}

export async function criarLivro(req: Request, res: Response) {
  try {
    const novoLivro = await livroService.criarLivro(req.body);
    return res.status(201).json(novoLivro);
  } catch (erro: any) {
    if (erro.code === 11000) {
      return res.status(400).json({ mensagem: 'ISBN já cadastrado' });
    }

    return res.status(400).json({
      mensagem: 'Erro ao criar livro',
      erro: erro.message
    });
  }
}

export async function atualizarLivro(
  req: Request<{ id: string }>,
  res: Response
) {
  try {
    const { id } = req.params;

    const livroAtualizado = await livroService.atualizarLivro(id, req.body);

    if (!livroAtualizado) {
      return res.status(404).json({ mensagem: 'Livro não encontrado' });
    }

    return res.status(200).json(livroAtualizado);
  } catch (erro: any) {
    if (erro.code === 11000) {
      return res.status(400).json({ mensagem: 'ISBN já cadastrado' });
    }

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
  } catch (erro) {
    return res.status(500).json({ mensagem: 'Erro ao deletar livro' });
  }
}