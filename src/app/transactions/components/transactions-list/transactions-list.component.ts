import { Component, OnInit } from '@angular/core';
import {TransactionsService} from "../../services/transactions.service";
import {Observable} from "rxjs";
import {TransactionDetails} from "../../models/transaction-data";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss']
})
export class TransactionsListComponent implements OnInit {
  transactionsDetailsList$!: Observable<TransactionDetails[]>;

  constructor(private transactionsService: TransactionsService) { }

  ngOnInit(): void {
    this.transactionsDetailsList$ = this.transactionsService.transactionsDetailsList$;
  }

  onInputChange($event: string): void {
    this.transactionsDetailsList$ = this.transactionsService.transactionsDetailsList$.pipe(
      map((data) => {
        const searched = $event.trim().toLowerCase();
        return data.filter((d) => d.merchant.name.toLowerCase().includes(searched));
      }),
    );
  }
}
