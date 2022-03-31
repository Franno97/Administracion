import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeBoardComponent } from './mensaje-board.component';

describe('MensajeBoardComponent', () => {
  let component: MensajeBoardComponent;
  let fixture: ComponentFixture<MensajeBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MensajeBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MensajeBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
