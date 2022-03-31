import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosPasaporteBeneficiarioComponent } from './datos-pasaporte-beneficiario.component';

describe('DatosPasaporteBeneficiarioComponent', () => {
  let component: DatosPasaporteBeneficiarioComponent;
  let fixture: ComponentFixture<DatosPasaporteBeneficiarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosPasaporteBeneficiarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosPasaporteBeneficiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
