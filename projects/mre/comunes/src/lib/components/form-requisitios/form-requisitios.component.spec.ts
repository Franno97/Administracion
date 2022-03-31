import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRequisitiosComponent } from './form-requisitios.component';

describe('FormRequisitiosComponent', () => {
  let component: FormRequisitiosComponent;
  let fixture: ComponentFixture<FormRequisitiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormRequisitiosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRequisitiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
