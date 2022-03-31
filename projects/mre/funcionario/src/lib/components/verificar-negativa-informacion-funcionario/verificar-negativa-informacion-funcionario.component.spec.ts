import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificarNegativaInformacionFuncionarioComponent } from './verificar-negativa-informacion-funcionario.component';

describe('VerificarNegativaInformacionFuncionarioComponent', () => {
  let component: VerificarNegativaInformacionFuncionarioComponent;
  let fixture: ComponentFixture<VerificarNegativaInformacionFuncionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerificarNegativaInformacionFuncionarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificarNegativaInformacionFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
