import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarJogosComponent } from './consultar-jogos.component';

describe('ConsultarJogosComponent', () => {
  let component: ConsultarJogosComponent;
  let fixture: ComponentFixture<ConsultarJogosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultarJogosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarJogosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
