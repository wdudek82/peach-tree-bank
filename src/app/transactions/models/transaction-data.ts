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
