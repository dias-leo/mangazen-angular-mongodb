import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { catchError, finalize, map, of, timeout } from 'rxjs';
import { LivroService } from '../../../../core/services/livro.service';
import { ILivro } from '../../../../core/interfaces/livro.interface';

@Component({
  selector: 'app-listagem-livros',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './listagem-livros.html',
  styleUrl: './listagem-livros.scss'
})
export class ListagemLivrosComponent implements OnInit {
  private readonly livroService = inject(LivroService);

  readonly livros = signal<ILivro[]>([]);
  readonly carregando = signal(false);
  readonly erro = signal('');

  ngOnInit(): void {
    this.carregarLivros();
  }

  carregarLivros(): void {
    this.carregando.set(true);
    this.erro.set('');

    this.livroService
      .listar()
      .pipe(
        timeout(10000),
        map((dados) => Array.isArray(dados) ? dados : ((dados as { value?: ILivro[] }).value ?? [])),
        catchError(() => {
          this.erro.set('Não foi possível carregar os livros.');
          return of([] as ILivro[]);
        }),
        finalize(() => {
          this.carregando.set(false);
        })
      )
      .subscribe((dados) => {
        this.livros.set(dados);
      });
  }

  excluirLivro(id: string): void {
    const confirmou = window.confirm('Tem certeza que deseja remover este livro?');

    if (!confirmou) {
      return;
    }

    this.livroService
      .excluir(id)
      .pipe(
        timeout(10000),
        catchError(() => {
          this.erro.set('Não foi possível remover o livro.');
          return of({ mensagem: '' });
        })
      )
      .subscribe(() => {
        this.carregarLivros();
      });
  }
}