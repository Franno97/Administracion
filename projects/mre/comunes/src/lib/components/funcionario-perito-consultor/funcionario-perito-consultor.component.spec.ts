import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionarioPeritoConsultorComponent } from './funcionario-perito-consultor.component';

describe('FuncionarioPeritoConsultorComponent', () => {
  let component: FuncionarioPeritoConsultorComponent;
  let fixture: ComponentFixture<FuncionarioPeritoConsultorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuncionarioPeritoConsultorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FuncionarioPeritoConsultorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
