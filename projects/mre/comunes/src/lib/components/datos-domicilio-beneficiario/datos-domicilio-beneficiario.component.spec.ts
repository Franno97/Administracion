import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosDomicilioBeneficiarioComponent } from './datos-domicilio-beneficiario.component';

describe('DatosDomicilioBeneficiarioComponent', () => {
  let component: DatosDomicilioBeneficiarioComponent;
  let fixture: ComponentFixture<DatosDomicilioBeneficiarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosDomicilioBeneficiarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosDomicilioBeneficiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
