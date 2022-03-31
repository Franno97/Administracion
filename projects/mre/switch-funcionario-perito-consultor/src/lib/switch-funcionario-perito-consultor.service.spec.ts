import { TestBed } from '@angular/core/testing';

import { SwitchFuncionarioPeritoConsultorService } from './switch-funcionario-perito-consultor.service';

describe('SwitchFuncionarioPeritoConsultorService', () => {
  let service: SwitchFuncionarioPeritoConsultorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwitchFuncionarioPeritoConsultorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
