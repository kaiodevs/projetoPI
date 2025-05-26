import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendedorLayoutComponent } from './vendedor-layout.component';

describe('VendedorLayoutComponent', () => {
  let component: VendedorLayoutComponent;
  let fixture: ComponentFixture<VendedorLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendedorLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendedorLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
