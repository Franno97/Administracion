import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionReconocimientoFacialConsultorComponent } from './revision-reconocimiento-facial-consultor.component';

describe('RevisionReconocimientoFacialConsultorComponent', () => {
  let component: RevisionReconocimientoFacialConsultorComponent;
  let fixture: ComponentFixture<RevisionReconocimientoFacialConsultorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevisionReconocimientoFacialConsultorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisionReconocimientoFacialConsultorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
