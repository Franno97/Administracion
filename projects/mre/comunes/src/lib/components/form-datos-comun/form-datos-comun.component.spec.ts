import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDatosComunComponent } from './form-datos-comun.component';

describe('FormDatosComunComponent', () => {
  let component: FormDatosComunComponent;
  let fixture: ComponentFixture<FormDatosComunComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDatosComunComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDatosComunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
