import { TestBed } from '@angular/core/testing';

import { EnviarDatosModalService } from './enviar-datos-modal.service';

describe('EnviarDatosModalService', () => {
  let service: EnviarDatosModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnviarDatosModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
