import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarCitaFuncionarioZonalComponent } from './generar-cita-funcionario-zonal.component';

describe('GenerarCitaFuncionarioZonalComponent', () => {
  let component: GenerarCitaFuncionarioZonalComponent;
  let fixture: ComponentFixture<GenerarCitaFuncionarioZonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerarCitaFuncionarioZonalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarCitaFuncionarioZonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
