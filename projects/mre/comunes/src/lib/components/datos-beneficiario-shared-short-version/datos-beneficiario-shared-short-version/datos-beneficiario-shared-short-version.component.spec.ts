import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosBeneficiarioSharedShortVersionComponent } from './datos-beneficiario-shared-short-version.component';

describe('DatosBeneficiarioSharedShortVersionComponent', () => {
  let component: DatosBeneficiarioSharedShortVersionComponent;
  let fixture: ComponentFixture<DatosBeneficiarioSharedShortVersionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosBeneficiarioSharedShortVersionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosBeneficiarioSharedShortVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
