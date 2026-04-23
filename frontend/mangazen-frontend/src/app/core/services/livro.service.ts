import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ILivro, ILivroCriacao, ILivroAtualizacao } from '../interfaces/livro.interface';

@Injectable({ providedIn: 'root' })
export class LivroService {
  constructor(private readonly http: HttpClient) {}

  private readonly apiUrl = `${environment.apiUrl}/livros`;

  listar(): Observable<ILivro[]> {
    return this.http.get<ILivro[]>(this.apiUrl);
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