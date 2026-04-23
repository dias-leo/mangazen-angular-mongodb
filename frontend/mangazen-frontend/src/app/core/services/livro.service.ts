import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ILivro, ILivroCriacao, ILivroAtualizacao } from '../interfaces/livro.interface';

export interface IListagemLivrosPaginada {
  itens: ILivro[];
  total: number;
  pagina: number;
  limite: number;
  totalPaginas: number;
}

@Injectable({ providedIn: 'root' })
export class LivroService {
  constructor(private readonly http: HttpClient) {}

  private readonly apiUrl = `${environment.apiUrl}/livros`;

  listar(pagina = 1, limite = 8): Observable<IListagemLivrosPaginada> {
    const params = new HttpParams()
      .set('pagina', String(pagina))
      .set('limite', String(limite));

    return this.http.get<IListagemLivrosPaginada>(this.apiUrl, { params });
  }

  buscarPorId(id: string): Observable<ILivro> {
    return this.http.get<ILivro>(`${this.apiUrl}/${id}`);
  }

  criar(livro: ILivroCriacao): Observable<ILivro> {
    return this.http.post<ILivro>(this.apiUrl, livro);
  }

  atualizar(id: string, livro: ILivroAtualizacao): Observable<ILivro> {
    return this.http.put<ILivro>(`${this.apiUrl}/${id}`, livro);
  }

  excluir(id: string): Observable<{ mensagem: string }> {
    return this.http.delete<{ mensagem: string }>(`${this.apiUrl}/${id}`);
  }
}