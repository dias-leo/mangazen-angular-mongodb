import { Routes } from '@angular/router';
import { ListagemLivrosComponent } from './features/livros/paginas/listagem-livros/listagem-livros';
import { FormularioLivroComponent } from './features/livros/paginas/formulario-livro/formulario-livro';

export const routes: Routes = [
  { path: '', component: ListagemLivrosComponent },
  { path: 'livros/novo', component: FormularioLivroComponent },
  { path: 'livros/editar/:id', component: FormularioLivroComponent }
];