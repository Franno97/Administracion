import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReconocimientoFacialFuncionarioZonalComponent } from './reconocimiento-facial-funcionario-zonal.component';

describe('ReconocimientoFacialFuncionarioZonalComponent', () => {
  let component: ReconocimientoFacialFuncionarioZonalComponent;
  let fixture: ComponentFixture<ReconocimientoFacialFuncionarioZonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReconocimientoFacialFuncionarioZonalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReconocimientoFacialFuncionarioZonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
