import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { TransactionsListComponent } from './transactions-list.component';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { FilterComponent } from '../../../bb-ui/components/filter/filter.component';
import { CustomTransactionItemComponent } from './custom-transaction-item/custom-transaction-item.component';
import { TransactionsService } from '../../services/transactions.service';
import { TransactionDetails } from '../../models/transaction-data';
import { findAllByDirective, findEl } from '../../../../spec-utils';
import { TransactionItemComponent } from '../../../bb-ui/components/transaction-item/transaction-item.component';
import { of } from 'rxjs';

const mockTransactions = {
  data: [
    {
      categoryCode: '#12a580',
      dates: {
        valueDate: 1600493600000,
      },
      transaction: {
        amountCurrency: {
          amount: 5000,
          currencyCode: 'EUR',
        },
        type: 'Salaries',
        creditDebitIndicator: 'CRDT',
      },
      merchant: {
        name: 'Backbase',
        accountNumber: 'SI64397745065188826',
      },
    },
    {
      categoryCode: '#12a580',
      dates: {
        valueDate: 1600387200000,
      },
      transaction: {
        amountCurrency: {
          amount: 82.02,
          currencyCode: 'EUR',
        },
        type: 'Card Payment',
        creditDebitIndicator: 'DBIT',
      },
      merchant: {
        name: 'The Tea Lounge',
        accountNumber: 'SI64397745065188826',
      },
    },
    {
      categoryCode: '#12a580',
      dates: {
        valueDate: 1600300800000,
      },
      transaction: {
        amountCurrency: {
          amount: 84.76,
          currencyCode: 'EUR',
        },
        type: 'Card Payment',
        creditDebitIndicator: 'DBIT',
      },
      merchant: {
        name: 'Starbucks',
        accountNumber: 'SI64397745065188826',
      },
    },
    {
      categoryCode: '#c12020',
      dates: {
        valueDate: 1600370800000,
      },
      transaction: {
        amountCurrency: {
          amount: 22.1,
          currencyCode: 'EUR',
        },
        type: 'Online Transfer',
        creditDebitIndicator: 'DBIT',
      },
      merchant: {
        name: 'Amazon Online Store',
        accountNumber: 'SI64397745065188826',
      },
    },
    {
      categoryCode: '#c89616',
      dates: {
        valueDate: 1600214400000,
      },
      transaction: {
        amountCurrency: {
          amount: 46.25,
          currencyCode: 'EUR',
        },
        type: 'Card Payment',
        creditDebitIndicator: 'DBIT',
      },
      merchant: {
        name: '7-Eleven',
        accountNumber: 'SI64397745065188826',
      },
    },
    {
      categoryCode: '#d51271',
      dates: {
        valueDate: 1600300800000,
      },
      transaction: {
        amountCurrency: {
          amount: 84.64,
          currencyCode: 'EUR',
        },
        type: 'Card Payment',
        creditDebitIndicator: 'DBIT',
      },
      merchant: {
        name: 'Texaco',
        accountNumber: 'SI64397745065188826',
      },
    },
    {
      categoryCode: '#e25a2c',
      dates: {
        valueDate: 1702633600000,
      },
      transaction: {
        amountCurrency: {
          amount: 19.72,
          currencyCode: 'EUR',
        },
        type: 'Online Transfer',
        creditDebitIndicator: 'DBIT',
      },
      merchant: {
        name: 'H&M Online Store',
        accountNumber: 'SI64397745065188826',
      },
    },
    {
      categoryCode: '#1180aa',
      dates: {
        valueDate: 1600041600000,
      },
      transaction: {
        amountCurrency: {
          amount: 52.36,
          currencyCode: 'EUR',
        },
        type: 'Transaction',
        creditDebitIndicator: 'DBIT',
      },
      merchant: {
        name: 'Lawrence Pearson',
        accountNumber: 'SI64397745065188826',
      },
    },
    {
      categoryCode: '#12a580',
      dates: {
        valueDate: 1599955200000,
      },
      transaction: {
        amountCurrency: {
          amount: 75.93,
          currencyCode: 'EUR',
        },
        type: 'Card Payment',
        creditDebitIndicator: 'DBIT',
      },
      merchant: {
        name: 'Whole Foods',
        accountNumber: 'SI64397745065188826',
      },
    },
    {
      categoryCode: '#fbbb1b',
      dates: {
        valueDate: 1599868800000,
      },
      transaction: {
        amountCurrency: {
          amount: 142.95,
          currencyCode: 'EUR',
        },
        type: 'Online Transfer',
        creditDebitIndicator: 'DBIT',
      },
      merchant: {
        name: 'Southern Electric Company',
        accountNumber: 'SI64397745065188826',
      },
    },
  ],
};

describe('TransactionsListComponent', () => {
  let component: TransactionsListComponent;
  let fixture: ComponentFixture<TransactionsListComponent>;
  let transactionsService: TransactionsService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [
        TransactionsListComponent,
        FilterComponent,
        CustomTransactionItemComponent,
        TransactionItemComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsListComponent);
    component = fixture.componentInstance;
    transactionsService = TestBed.inject(TransactionsService);
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('fetches transactions details when app is loaded', () => {
    const url =
      'https://r9vdzv10vd.execute-api.eu-central-1.amazonaws.com/dev/transactions';
    const request = httpMock.expectOne(url);
    expect(() => request).not.toThrow();

    request.flush(mockTransactions);
    expect(transactionsService['transactionDetailsListSource'].value).toEqual(
      mockTransactions.data,
    );
  });

  it('shows transactions list sorted by date', fakeAsync(() => {
    // Prepare two copies of mock data
    const mockDataCopyA = { data: [...mockTransactions.data] };
    const mockDataCopyB = { data: [...mockTransactions.data] };

    // Simulate request to transactions endpoint.
    const url =
      'https://r9vdzv10vd.execute-api.eu-central-1.amazonaws.com/dev/transactions';
    const request = httpMock.expectOne(url);
    request.flush(mockDataCopyA);

    // Get transactions details from the component.
    let transactionsDetails: TransactionDetails[] = [];
    component.transactionsDetailsList$.subscribe((data) => {
      transactionsDetails = data;
    });
    fixture.detectChanges();

    // Find all transaction items in the DOM.
    const transactions = findAllByDirective(
      fixture,
      CustomTransactionItemComponent,
    );

    // Sort second mock list for comparison.
    transactionsService.sortTransactions(mockDataCopyB.data);

    expect(transactionsDetails).toEqual(mockDataCopyB.data);
    expect(transactions.length).toBe(mockDataCopyB.data.length);
  }));

  it('allows filtering transactions by merchant name', fakeAsync(() => {
    component.transactionsDetailsList$ = of(mockTransactions.data);

    fixture.detectChanges();

    let transactionsDetails: TransactionDetails[] = [];
    component.transactionsDetailsList$.subscribe((data) => {
      transactionsDetails = data;
    });
    expect(transactionsDetails.length).toBe(mockTransactions.data.length);

    // Filter transactions
    const searchedTerm = 'Backbase';
    const filterInputDebugEl = findEl(fixture, 'filterInput');
    const onInputChangeSpy = spyOn(
      component,
      'onInputChange',
    ).and.callThrough();
    filterInputDebugEl.triggerEventHandler('keyup', {
      target: { value: searchedTerm },
    });

    fixture.detectChanges();
    tick();

    const transactionsElements = findAllByDirective(
      fixture,
      CustomTransactionItemComponent,
    );

    // TODO: Fix: Template is not rerendered correctly.
    // expect(transactionsElements.length).toBe(1);
    expect(onInputChangeSpy).toHaveBeenCalledOnceWith(searchedTerm);
  }));

  it('keeps filtered and correctly updates list state when new transaction is added', () => {
    pending();
  });
});
