import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, tap} from "rxjs/operators";
import {Observable} from "rxjs";

export interface Dates {
  valueDate: number;
}

export interface AmountCurrency {
  amount: number;
  currencyCode: string;
}

export interface Transaction {
  amountCurrency: AmountCurrency;
  type: string;
  creditDebitIndicator: string;
}

export interface Merchant {
  name: string;
  accountNumber: string;
}

export interface TransactionData {
  categoryCode: string;
  dates: Dates;
  transaction: Transaction;
  merchant: Merchant;
}

export interface TransactionResponse {
  data: TransactionData[];
}

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  private baseUrl = 'https://r9vdzv10vd.execute-api.eu-central-1.amazonaws.com/dev';

  constructor(private http: HttpClient) {
  }

  fetchTransactionData(): Observable<TransactionData[]> {
    return this.http.get<TransactionResponse>(this.baseUrl + '/transactions').pipe(
      tap((data) => {
        console.log('data:', data);
      }),
      catchError((_err) => {
        console.log('Unable to fetch transactions data. Reusing local cache.');
        return this.fetchLocalTransactionsData();
      }),
      map(({data}) => {
        data.sort((a, b) => (a.dates.valueDate < b.dates.valueDate) ? 1 : -1);
        return data;
      }),
    );
  }

  fetchLocalTransactionsData(): Observable<TransactionResponse> {
    return this.http.get<TransactionResponse>('assets/mock-data/transactions.json');
  }
}
