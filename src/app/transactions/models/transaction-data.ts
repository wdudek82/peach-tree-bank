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

export class TransactionDetails {
  categoryCode: string;
  dates: Dates;
  transaction: Transaction;
  merchant: Merchant;

  constructor(targetAccountName: string, amount: number) {
    this.categoryCode = '#c12020';
    this.dates = {
      valueDate: new Date().getTime(),
    };

    const amountCurrency: AmountCurrency = {
      amount,
      currencyCode: 'EUR'
    };
    this.transaction = {
      amountCurrency,
      type: 'Online Transfer',
      creditDebitIndicator: 'DBIT'
    };
    this.merchant = {
      name: targetAccountName,
      accountNumber: 'SI0000000000000'
    }
  }
}
