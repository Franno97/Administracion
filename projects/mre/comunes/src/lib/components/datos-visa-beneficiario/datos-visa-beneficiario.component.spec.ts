import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosVisaBeneficiarioComponent } from './datos-visa-beneficiario.component';

describe('DatosVisaBeneficiarioComponent', () => {
  let component: DatosVisaBeneficiarioComponent;
  let fixture: ComponentFixture<DatosVisaBeneficiarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosVisaBeneficiarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosVisaBeneficiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
