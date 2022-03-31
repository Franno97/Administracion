import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomicilioPasaporteVisaComponent } from './domicilio-pasaporte-visa.component';

describe('DomicilioPasaporteVisaComponent', () => {
  let component: DomicilioPasaporteVisaComponent;
  let fixture: ComponentFixture<DomicilioPasaporteVisaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DomicilioPasaporteVisaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DomicilioPasaporteVisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
