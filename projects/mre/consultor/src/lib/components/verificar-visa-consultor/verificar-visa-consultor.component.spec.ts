import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificarVisaConsultorComponent } from './verificar-visa-consultor.component';

describe('VerificarVisaConsultorComponent', () => {
  let component: VerificarVisaConsultorComponent;
  let fixture: ComponentFixture<VerificarVisaConsultorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerificarVisaConsultorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificarVisaConsultorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
