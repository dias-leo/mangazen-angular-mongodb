import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { catchError, finalize, of, timeout } from 'rxjs';
import { IListagemLivrosPaginada, LivroService } from '../../../../core/services/livro.service';
import { ILivro } from '../../../../core/interfaces/livro.interface';
import { HeaderSiteComponent } from '../../componentes/header-site/header-site';
import { HeroBannerComponent } from '../../componentes/hero-banner/hero-banner';
import { CategoriasSectionComponent } from '../../componentes/categorias-section/categorias-section';
import { FooterSiteComponent } from '../../componentes/footer-site/footer-site';

@Component({
  selector: 'app-listagem-livros',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderSiteComponent, HeroBannerComponent, CategoriasSectionComponent, FooterSiteComponent],
  templateUrl: './listagem-livros.html',
  styleUrl: './listagem-livros.scss'
})
export class ListagemLivrosComponent implements OnInit {
  private readonly livroService = inject(LivroService);
  private readonly limitePorPagina = 8;

  readonly livros = signal<ILivro[]>([]);
  readonly carregando = signal(false);
  readonly erro = signal('');
  readonly paginaAtual = signal(1);
  readonly totalPaginas = signal(1);
  readonly totalItens = signal(0);
  readonly paginas = computed(() => Array.from({ length: this.totalPaginas() }, (_, indice) => indice + 1));

  ngOnInit(): void {
    this.carregarLivros();
  }

  carregarLivros(pagina = this.paginaAtual()): void {
    this.carregando.set(true);
    this.erro.set('');

    this.livroService
      .listar(pagina, this.limitePorPagina)
      .pipe(
        timeout(10000),
        catchError(() => {
          this.erro.set('Não foi possível carregar os livros.');
          return of({
            itens: [] as ILivro[],
            total: 0,
            pagina: 1,
            limite: this.limitePorPagina,
            totalPaginas: 1
          } as IListagemLivrosPaginada);
        }),
        finalize(() => {
          this.carregando.set(false);
        })
      )
      .subscribe((dados) => {
        this.livros.set(dados.itens);
        this.totalItens.set(dados.total);
        this.paginaAtual.set(dados.pagina);
        this.totalPaginas.set(Math.max(1, dados.totalPaginas));

        if (dados.itens.length === 0 && dados.total > 0 && dados.pagina > 1) {
          this.carregarLivros(dados.pagina - 1);
        }
      });
  }

  irParaPagina(pagina: number): void {
    if (pagina < 1 || pagina > this.totalPaginas() || pagina === this.paginaAtual()) {
      return;
    }

    this.carregarLivros(pagina);
  }

  paginaAnterior(): void {
    this.irParaPagina(this.paginaAtual() - 1);
  }

  proximaPagina(): void {
    this.irParaPagina(this.paginaAtual() + 1);
  }

  excluirLivro(id: string): void {
    const confirmou = globalThis.confirm('Tem certeza que deseja remover este livro?');

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
        this.carregarLivros(this.paginaAtual());
      });
  }
}