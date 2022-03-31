import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TramitesPendientesComponent } from './tramites-pendientes.component';

describe('TramitesPendientesComponent', () => {
  let component: TramitesPendientesComponent;
  let fixture: ComponentFixture<TramitesPendientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TramitesPendientesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TramitesPendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
