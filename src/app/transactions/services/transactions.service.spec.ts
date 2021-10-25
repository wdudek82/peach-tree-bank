import { TestBed } from '@angular/core/testing';

import { TransactionsService } from './transactions.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('TransactionsService', () => {
  let service: TransactionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ]
    });
    service = TestBed.inject(TransactionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
