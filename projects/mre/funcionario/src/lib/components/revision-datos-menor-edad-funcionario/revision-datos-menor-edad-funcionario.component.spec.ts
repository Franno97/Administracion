import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionDatosMenorEdadFuncionarioComponent } from './revision-datos-menor-edad-funcionario.component';

describe('RevisionDatosMenorEdadFuncionarioComponent', () => {
  let component: RevisionDatosMenorEdadFuncionarioComponent;
  let fixture: ComponentFixture<RevisionDatosMenorEdadFuncionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevisionDatosMenorEdadFuncionarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisionDatosMenorEdadFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
