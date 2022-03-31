import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeritoComponent } from './perito.component';

describe('PeritoComponent', () => {
  let component: PeritoComponent;
  let fixture: ComponentFixture<PeritoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeritoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
