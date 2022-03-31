import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeritajePeritoComponent } from './peritaje-perito.component';

describe('PeritajePeritoComponent', () => {
  let component: PeritajePeritoComponent;
  let fixture: ComponentFixture<PeritajePeritoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeritajePeritoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeritajePeritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
