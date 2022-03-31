import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeBoardPopupComponent } from './mensaje-board-popup.component';

describe('MensajeBoardPopupComponent', () => {
  let component: MensajeBoardPopupComponent;
  let fixture: ComponentFixture<MensajeBoardPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MensajeBoardPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MensajeBoardPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
