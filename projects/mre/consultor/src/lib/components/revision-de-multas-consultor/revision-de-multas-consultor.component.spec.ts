import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionDeMultasConsultorComponent } from './revision-de-multas-consultor.component';

describe('RevisionDeMultasConsultorComponent', () => {
  let component: RevisionDeMultasConsultorComponent;
  let fixture: ComponentFixture<RevisionDeMultasConsultorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevisionDeMultasConsultorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisionDeMultasConsultorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
