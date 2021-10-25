import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, tap} from "rxjs/operators";
import {BehaviorSubject, Observable} from "rxjs";
import {TransactionDetails} from "../models/transaction-data";
import {AccountService} from "./account.service";

export interface TransactionResponse {
  data: TransactionDetails[];
}

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  private baseUrl = 'https://r9vdzv10vd.execute-api.eu-central-1.amazonaws.com/dev';
  private transactionDetailsListSource = new BehaviorSubject<TransactionDetails[]>([]);
  transactionsDetailsList$ = this.transactionDetailsListSource.asObservable();

  constructor(private http: HttpClient, private accountService: AccountService) {
    this.fetchAllTransactionsDetails().subscribe();
  }

  addTransaction(targetAccountName: string, amount: number): void {
    // 1. add new transaction to last value of the transactionsData subject,
    // 2. new transactionsDataList, containing the new transaction, will be emitted
    // 3. the transaction amount will be subtracted from the account balance
    const transactionDetails = new TransactionDetails(targetAccountName, amount);
    const updatedTransactionsData = [
      transactionDetails,
      ...this.transactionDetailsListSource.value,
    ];
    this.transactionDetailsListSource.next(updatedTransactionsData);
    this.accountService.account.balance -= amount;
  }

  private fetchAllTransactionsDetails(): Observable<TransactionDetails[]> {
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
        this.transactionDetailsListSource.next(transactionsData)
        return transactionsData;
      }),
    );
  }

  private fetchLocalTransactionsData(): Observable<TransactionResponse> {
    return this.http.get<TransactionResponse>('assets/mock-data/transactions.json');
  }
}
