import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosBeneficiarioComponent } from './datos-beneficiario.component';

describe('DatosBeneficiarioComponent', () => {
  let component: DatosBeneficiarioComponent;
  let fixture: ComponentFixture<DatosBeneficiarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosBeneficiarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosBeneficiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
