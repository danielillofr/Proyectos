import { TestBed, async, inject } from '@angular/core/testing';

import { PagesGuardGuard } from './pages-guard.guard';

describe('PagesGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PagesGuardGuard]
    });
  });

  it('should ...', inject([PagesGuardGuard], (guard: PagesGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
