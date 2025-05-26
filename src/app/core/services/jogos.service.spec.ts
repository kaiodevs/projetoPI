import { TestBed } from '@angular/core/testing';

import { JogosService } from './jogos.service';

describe('JogosService', () => {
  let service: JogosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JogosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
