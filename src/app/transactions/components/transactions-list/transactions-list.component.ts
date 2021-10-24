import { Component, OnInit } from '@angular/core';
import {TransactionsService} from "../../services/transactions.service";
import {Observable} from "rxjs";
import {TransactionData} from "../../models/transaction-data";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss']
})
export class TransactionsListComponent implements OnInit {
  transactionsDataList$!: Observable<TransactionData[]>;

  constructor(private transactionsService: TransactionsService) { }

  ngOnInit(): void {
    this.transactionsDataList$ = this.transactionsService.transactionsDataList$;
  }

  onInputChange($event: string): void {
    this.transactionsDataList$ = this.transactionsService.transactionsDataList$.pipe(
      map((data) => {
        return data.filter((d) => d.merchant.name.includes($event));
      }),
    );
  }
}
