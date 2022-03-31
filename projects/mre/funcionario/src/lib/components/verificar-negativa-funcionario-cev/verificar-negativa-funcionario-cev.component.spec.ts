import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificarNegativaFuncionarioCevComponent } from './verificar-negativa-funcionario-cev.component';

describe('VerificarNegativaFuncionarioCevComponent', () => {
  let component: VerificarNegativaFuncionarioCevComponent;
  let fixture: ComponentFixture<VerificarNegativaFuncionarioCevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerificarNegativaFuncionarioCevComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificarNegativaFuncionarioCevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
