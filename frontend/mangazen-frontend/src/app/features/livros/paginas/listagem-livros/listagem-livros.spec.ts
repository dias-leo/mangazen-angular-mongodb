import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemLivrosComponent } from './listagem-livros';

describe('ListagemLivros', () => {
  let component: ListagemLivrosComponent;
  let fixture: ComponentFixture<ListagemLivrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListagemLivrosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListagemLivrosComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
