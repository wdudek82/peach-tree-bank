import { Component, OnInit } from '@angular/core';
import {TransactionData, TransactionsService} from "../../services/transactions.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss']
})
export class TransactionsListComponent implements OnInit {
  transactions$!: Observable<TransactionData[]>;

  constructor(private transactionsService: TransactionsService) { }

  ngOnInit(): void {
    this.transactions$ = this.transactionsService.fetchTransactionData();
  }
}
