import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { catchError, finalize, map, of, timeout } from 'rxjs';
import { LivroService } from '../../../../core/services/livro.service';
import { ILivro } from '../../../../core/interfaces/livro.interface';

@Component({
  selector: 'app-listagem-livros',
  standalone: true,
  imports: [CommonModule],
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
}