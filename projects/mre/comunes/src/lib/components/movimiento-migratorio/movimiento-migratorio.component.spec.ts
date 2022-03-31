import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientoMigratorioComponent } from './movimiento-migratorio.component';

describe('MovimientoMigratorioComponent', () => {
  let component: MovimientoMigratorioComponent;
  let fixture: ComponentFixture<MovimientoMigratorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovimientoMigratorioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovimientoMigratorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
