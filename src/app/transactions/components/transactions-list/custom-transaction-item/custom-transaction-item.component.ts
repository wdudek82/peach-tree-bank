import {Component, Input} from '@angular/core';
import {Merchant, Transaction, TransactionDetails} from "../../../models/transaction-data";

@Component({
  selector: 'app-custom-transaction-item',
  templateUrl: './custom-transaction-item.component.html',
  styleUrls: ['./custom-transaction-item.component.scss']
})
export class CustomTransactionItemComponent {
  @Input() transactionDetails!: TransactionDetails;

  get merchant(): Merchant {
    return this.transactionDetails.merchant;
  }

  get transaction(): Transaction {
    return this.transactionDetails.transaction;
  }

  get transactionDate(): Date {
    return new Date(this.transactionDetails.dates.valueDate);
  }

  getAmountCurrencyStyles(): any {
    return {
      color: this.transaction.amountCurrency.amount > 0 ? 'green' : 'red',
    };
  }
}
