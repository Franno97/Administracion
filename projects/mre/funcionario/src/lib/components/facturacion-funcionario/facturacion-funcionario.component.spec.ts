import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturacionFuncionarioComponent } from './facturacion-funcionario.component';

describe('FacturacionFuncionarioComponent', () => {
  let component: FacturacionFuncionarioComponent;
  let fixture: ComponentFixture<FacturacionFuncionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacturacionFuncionarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturacionFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
