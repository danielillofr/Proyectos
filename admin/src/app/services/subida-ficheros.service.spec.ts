import { TestBed } from '@angular/core/testing';

import { SubidaFicherosService } from './subida-ficheros.service';

describe('SubidaFicherosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubidaFicherosService = TestBed.get(SubidaFicherosService);
    expect(service).toBeTruthy();
  });
});
