import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { catchError, finalize, of, timeout } from 'rxjs';
import { LivroService } from '../../../../core/services/livro.service';
import { ILivroCriacao } from '../../../../core/interfaces/livro.interface';

@Component({
  selector: 'app-formulario-livro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `<section class="container">
  <header class="cabecalho">
    <h1>{{ modoEdicao() ? 'Editar Livro' : 'Novo Livro' }}</h1>
    <a class="voltar" routerLink="/">Voltar ao catálogo</a>
  </header>

  <p *ngIf="carregando()">Carregando dados do livro...</p>
  <p class="erro" *ngIf="erro()">{{ erro() }}</p>

  <form [formGroup]="formulario" (ngSubmit)="salvar()" class="formulario" *ngIf="!carregando()">
    <label>
      Título
      <input type="text" formControlName="titulo" />
    </label>

    <label>
      Subtítulo
      <input type="text" formControlName="subtitulo" />
    </label>

    <label>
      ISBN-13
      <input type="text" formControlName="isbn13" />
    </label>

    <div class="linha-dupla">
      <label>
        Preço
        <input type="number" step="0.01" formControlName="preco" />
      </label>

      <label>
        Estoque
        <input type="number" formControlName="estoque" />
      </label>
    </div>

    <label>
      Categorias (separadas por vírgula)
      <input type="text" formControlName="categorias" />
    </label>

    <label>
      Data de publicação
      <input type="date" formControlName="dataPublicacao" />
    </label>

    <label>
      URL da capa
      <input type="url" formControlName="capaUrl" />
    </label>

    <label>
      Texto alternativo da capa
      <input type="text" formControlName="capaTextoAlternativo" />
    </label>

    <button type="submit" [disabled]="salvando()">
      {{ salvando() ? 'Salvando...' : 'Salvar livro' }}
    </button>
  </form>
</section>`,
  styles: [`.container {
  max-width: 840px;
  margin: 0 auto;
  padding: 24px;
}

.cabecalho {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.voltar {
  text-decoration: none;
  color: #0f766e;
  font-weight: 600;
}

.erro {
  color: #7f1d1d;
  background: #fee2e2;
  border-radius: 8px;
  padding: 12px;
}

.formulario {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

label {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-weight: 600;
}

input {
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 10px;
  font-size: 14px;
}

.linha-dupla {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

button {
  align-self: flex-start;
  border: 0;
  border-radius: 8px;
  background: #0f766e;
  color: #fff;
  font-weight: 700;
  padding: 10px 14px;
  cursor: pointer;
}

button:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

@media (max-width: 680px) {
  .cabecalho {
    flex-direction: column;
    align-items: flex-start;
  }

  .linha-dupla {
    grid-template-columns: 1fr;
  }
}`]
})
export class FormularioLivroComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly livroService = inject(LivroService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly carregando = signal(false);
  readonly salvando = signal(false);
  readonly erro = signal('');
  readonly modoEdicao = signal(false);

  private livroId = '';

  readonly formulario = this.fb.group({
    titulo: ['', [Validators.required, Validators.minLength(2)]],
    subtitulo: ['', [Validators.required]],
    isbn13: ['', [Validators.required, Validators.pattern(/^\d{13}$/)]],
    preco: [0, [Validators.required, Validators.min(0)]],
    estoque: [0, [Validators.required, Validators.min(0)]],
    categorias: ['', [Validators.required]],
    dataPublicacao: ['', [Validators.required]],
    capaUrl: ['', [Validators.required]],
    capaTextoAlternativo: ['', [Validators.required]]
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      return;
    }

    this.modoEdicao.set(true);
    this.livroId = id;
    this.carregarLivro(id);
  }

  salvar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const dados = this.mapearFormularioParaPayload();

    this.salvando.set(true);
    this.erro.set('');

    const requisicao = this.modoEdicao()
      ? this.livroService.atualizar(this.livroId, dados)
      : this.livroService.criar(dados);

    requisicao
      .pipe(
        timeout(10000),
        catchError(() => {
          this.erro.set('Não foi possível salvar o livro.');
          return of(null);
        }),
        finalize(() => {
          this.salvando.set(false);
        })
      )
      .subscribe((resposta) => {
        if (!resposta) {
          return;
        }

        this.router.navigateByUrl('/');
      });
  }

  private carregarLivro(id: string): void {
    this.carregando.set(true);
    this.erro.set('');

    this.livroService
      .buscarPorId(id)
      .pipe(
        timeout(10000),
        catchError(() => {
          this.erro.set('Não foi possível carregar o livro para edição.');
          return of(null);
        }),
        finalize(() => {
          this.carregando.set(false);
        })
      )
      .subscribe((livro) => {
        if (!livro) {
          return;
        }

        const dataFormatada = livro.dataPublicacao?.slice(0, 10) ?? '';

        this.formulario.patchValue({
          titulo: livro.titulo,
          subtitulo: livro.subtitulo,
          isbn13: livro.isbn13,
          preco: livro.preco,
          estoque: livro.estoque,
          categorias: livro.categorias.join(', '),
          dataPublicacao: dataFormatada,
          capaUrl: livro.capa.url,
          capaTextoAlternativo: livro.capa.textoAlternativo
        });
      });
  }

  private mapearFormularioParaPayload(): ILivroCriacao {
    const valores = this.formulario.getRawValue();

    return {
      titulo: valores.titulo ?? '',
      subtitulo: valores.subtitulo ?? '',
      isbn13: valores.isbn13 ?? '',
      preco: Number(valores.preco ?? 0),
      estoque: Number(valores.estoque ?? 0),
      categorias: (valores.categorias ?? '')
        .split(',')
        .map((categoria) => categoria.trim())
        .filter(Boolean),
      dataPublicacao: valores.dataPublicacao ?? '',
      capa: {
        url: valores.capaUrl ?? '',
        textoAlternativo: valores.capaTextoAlternativo ?? ''
      }
    };
  }
}
