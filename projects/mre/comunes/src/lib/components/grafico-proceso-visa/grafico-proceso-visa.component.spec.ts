import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoProcesoVisaComponent } from './grafico-proceso-visa.component';

describe('GraficoProcesoVisaComponent', () => {
  let component: GraficoProcesoVisaComponent;
  let fixture: ComponentFixture<GraficoProcesoVisaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficoProcesoVisaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficoProcesoVisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
