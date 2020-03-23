import { TestBed } from '@angular/core/testing';

import { Ng2PagingTableService } from './ng2-paging-table.service';

describe('Ng2PagingTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Ng2PagingTableService = TestBed.get(Ng2PagingTableService);
    expect(service).toBeTruthy();
  });
});
