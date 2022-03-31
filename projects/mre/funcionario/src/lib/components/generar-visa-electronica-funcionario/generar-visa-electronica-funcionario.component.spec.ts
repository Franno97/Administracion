import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarVisaElectronicaFuncionarioComponent } from './generar-visa-electronica-funcionario.component';

describe('GenerarVisaElectronicaFuncionarioComponent', () => {
  let component: GenerarVisaElectronicaFuncionarioComponent;
  let fixture: ComponentFixture<GenerarVisaElectronicaFuncionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerarVisaElectronicaFuncionarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarVisaElectronicaFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
