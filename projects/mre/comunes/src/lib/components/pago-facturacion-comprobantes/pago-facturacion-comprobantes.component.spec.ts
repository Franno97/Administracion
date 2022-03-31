import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoFacturacionComprobantesComponent } from './pago-facturacion-comprobantes.component';

describe('PagoFacturacionComprobantesComponent', () => {
  let component: PagoFacturacionComprobantesComponent;
  let fixture: ComponentFixture<PagoFacturacionComprobantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagoFacturacionComprobantesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoFacturacionComprobantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
