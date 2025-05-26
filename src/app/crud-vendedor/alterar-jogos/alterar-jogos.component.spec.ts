import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterarJogosComponent } from './alterar-jogos.component';

describe('AlterarJogosComponent', () => {
  let component: AlterarJogosComponent;
  let fixture: ComponentFixture<AlterarJogosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlterarJogosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlterarJogosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
