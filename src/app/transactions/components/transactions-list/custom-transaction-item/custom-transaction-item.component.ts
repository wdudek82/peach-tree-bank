import {Component, Input} from '@angular/core';
import {Merchant, Transaction, TransactionData} from "../../../models/transaction-data";

@Component({
  selector: 'app-custom-transaction-item',
  templateUrl: './custom-transaction-item.component.html',
  styleUrls: ['./custom-transaction-item.component.scss']
})
export class CustomTransactionItemComponent {
  @Input() transactionData!: TransactionData;

  get merchant(): Merchant {
    return this.transactionData.merchant;
  }

  get transaction(): Transaction {
    return this.transactionData.transaction;
  }

  get transactionDate(): Date {
    return new Date(this.transactionData.dates.valueDate);
  }

  getAmountCurrencyStyles(): any {
    return {
      color: this.transaction.amountCurrency.amount > 0 ? 'green' : 'red',
    };
  }
}
