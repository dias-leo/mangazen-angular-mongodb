import { Router } from "express";
import {
  listarLivros,
  buscarLivroPorId,
  criarLivro,
  atualizarLivro,
  deletarLivro
} from "../controllers/livro.controller";

const router = Router();

router.get('/', listarLivros);
router.get('/:id', buscarLivroPorId);
router.post('/', criarLivro);
router.put('/:id', atualizarLivro);
router.delete('/:id', deletarLivro);

export default router;