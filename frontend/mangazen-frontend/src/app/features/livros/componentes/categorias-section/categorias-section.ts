import { Component } from '@angular/core';

interface ICategoria {
  nome: string;
  descricao: string;
  total: string;
}

@Component({
  selector: 'app-categorias-section',
  standalone: true,
  templateUrl: './categorias-section.html',
  styleUrl: './categorias-section.scss'
})
export class CategoriasSectionComponent {
  readonly categorias: ICategoria[] = [
    { nome: 'Shounen', descricao: 'Ação, treino e superação', total: '413 títulos' },
    { nome: 'Seinen', descricao: 'Histórias adultas e complexas', total: '95 títulos' },
    { nome: 'Romance', descricao: 'Relacionamentos e drama', total: '270 títulos' },
    { nome: 'Ação', descricao: 'Batalhas épicas e aventura', total: '382 títulos' },
    { nome: 'Fantasia', descricao: 'Mundos mágicos e criaturas', total: '147 títulos' },
    { nome: 'Slice of Life', descricao: 'Cotidiano com emoção', total: '189 títulos' }
  ];
}
