import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidarInformacionFuncionarioCevComponent } from './validar-informacion-funcionario-cev.component';

describe('ValidarInformacionFuncionarioCevComponent', () => {
  let component: ValidarInformacionFuncionarioCevComponent;
  let fixture: ComponentFixture<ValidarInformacionFuncionarioCevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidarInformacionFuncionarioCevComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidarInformacionFuncionarioCevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
