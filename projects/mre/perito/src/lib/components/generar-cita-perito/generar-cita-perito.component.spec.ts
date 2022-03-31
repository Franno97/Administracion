import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarCitaPeritoComponent } from './generar-cita-perito.component';

describe('GenerarCitaPeritoComponent', () => {
  let component: GenerarCitaPeritoComponent;
  let fixture: ComponentFixture<GenerarCitaPeritoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerarCitaPeritoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarCitaPeritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
