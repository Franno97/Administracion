import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificarMultasNegativasFuncionarioComponent } from './verificar-multas-negativas-funcionario.component';

describe('VerificarMultasNegativasFuncionarioComponent', () => {
  let component: VerificarMultasNegativasFuncionarioComponent;
  let fixture: ComponentFixture<VerificarMultasNegativasFuncionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerificarMultasNegativasFuncionarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificarMultasNegativasFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
