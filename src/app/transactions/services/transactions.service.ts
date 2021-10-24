import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, tap} from "rxjs/operators";
import {BehaviorSubject, Observable} from "rxjs";
import {TransactionData} from "../models/transaction-data";
import {AccountService} from "./account.service";

export interface TransactionResponse {
  data: TransactionData[];
}

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  private baseUrl = 'https://r9vdzv10vd.execute-api.eu-central-1.amazonaws.com/dev';
  private transactionDataListSource = new BehaviorSubject<TransactionData[]>([]);
  transactionsDataList$ = this.transactionDataListSource.asObservable();

  constructor(private http: HttpClient, private accountService: AccountService) {
    this.fetchTransactionData().subscribe();
  }

  // TODO: Remove/modify when User-story-#3 is finished.
  addTransaction(targetAccountName: string, amount: number): void {
    // 1. add new transaction to last value of the transactionsData subject,
    // 3. new transactionsDataList, containing the new transaction, will be emitted
    const newTransactionData: TransactionData = {
      categoryCode: '#c12020',
      dates: {
        valueDate: new Date().getTime(),
      },
      transaction: {
        amountCurrency: {
          amount,
          currencyCode: 'EUR'
        },
        type: 'Online Transfer',
        creditDebitIndicator: 'DBIT'
      },
      merchant: {
        name: targetAccountName,
        accountNumber: 'SI0000000000000'
      }
    }
    const updatedTransactionsData = [
      newTransactionData,
      ...this.transactionDataListSource.value
    ];
    this.transactionDataListSource.next(updatedTransactionsData)
  }

  private fetchTransactionData(): Observable<TransactionData[]> {
    return this.http.get<TransactionResponse>(this.baseUrl + '/transactions').pipe(
      tap((data) => {
        console.log('data:', data);
      }),
      catchError((_err) => {
        console.log('Unable to fetch transactions data. Reusing local cache.');
        return this.fetchLocalTransactionsData();
      }),
      map(({data}) => {
        const transactionsData = data;
        transactionsData.sort((a, b) => (a.dates.valueDate < b.dates.valueDate) ? 1 : -1);
        this.transactionDataListSource.next(transactionsData)
        return transactionsData;
      }),
    );
  }

  private fetchLocalTransactionsData(): Observable<TransactionResponse> {
    return this.http.get<TransactionResponse>('assets/mock-data/transactions.json');
  }
}
