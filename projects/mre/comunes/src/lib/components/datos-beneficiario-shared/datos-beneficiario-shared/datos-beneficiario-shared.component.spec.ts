import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosBeneficiarioSharedComponent } from './datos-beneficiario-shared.component';

describe('DatosBeneficiarioSharedComponent', () => {
  let component: DatosBeneficiarioSharedComponent;
  let fixture: ComponentFixture<DatosBeneficiarioSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosBeneficiarioSharedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosBeneficiarioSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
