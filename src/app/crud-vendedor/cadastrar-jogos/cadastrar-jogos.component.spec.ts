import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarJogosComponent } from './cadastrar-jogos.component';

describe('CadastrarJogosComponent', () => {
  let component: CadastrarJogosComponent;
  let fixture: ComponentFixture<CadastrarJogosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarJogosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarJogosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
