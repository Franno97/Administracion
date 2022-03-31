import { TestBed } from '@angular/core/testing';

import { TramitesPendientesService } from './tramites-pendientes.service';

describe('TramitesPendientesService', () => {
  let service: TramitesPendientesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TramitesPendientesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
