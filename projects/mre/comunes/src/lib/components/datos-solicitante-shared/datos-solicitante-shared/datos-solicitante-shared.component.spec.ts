import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosSolicitanteSharedComponent } from './datos-solicitante-shared.component';

describe('DatosSolicitanteSharedComponent', () => {
  let component: DatosSolicitanteSharedComponent;
  let fixture: ComponentFixture<DatosSolicitanteSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosSolicitanteSharedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosSolicitanteSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
