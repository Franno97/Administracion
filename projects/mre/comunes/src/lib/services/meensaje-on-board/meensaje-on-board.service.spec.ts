import { TestBed } from '@angular/core/testing';

import { MeensajeOnBoardService } from './meensaje-on-board.service';

describe('MeensajeOnBoardService', () => {
  let service: MeensajeOnBoardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    });
    service = TestBed.inject(MeensajeOnBoardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
