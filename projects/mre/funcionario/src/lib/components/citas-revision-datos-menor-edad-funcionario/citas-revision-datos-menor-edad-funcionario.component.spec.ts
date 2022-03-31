import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasRevisionDatosMenorEdadFuncionarioComponent } from './citas-revision-datos-menor-edad-funcionario.component';

describe('CitasRevisionDatosMenorEdadFuncionarioComponent', () => {
  let component: CitasRevisionDatosMenorEdadFuncionarioComponent;
  let fixture: ComponentFixture<CitasRevisionDatosMenorEdadFuncionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitasRevisionDatosMenorEdadFuncionarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CitasRevisionDatosMenorEdadFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
