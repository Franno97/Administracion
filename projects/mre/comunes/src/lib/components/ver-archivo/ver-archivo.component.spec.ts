import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerArchivoComponent } from './ver-archivo.component';

describe('VerArchivoComponent', () => {
  let component: VerArchivoComponent;
  let fixture: ComponentFixture<VerArchivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerArchivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerArchivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
