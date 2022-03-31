import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidarPagoConsultorComponent } from './validar-pago-consultor.component';

describe('ValidarPagoConsultorComponent', () => {
  let component: ValidarPagoConsultorComponent;
  let fixture: ComponentFixture<ValidarPagoConsultorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidarPagoConsultorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidarPagoConsultorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
