import {Currency} from "./currency";

export class Account {
  name = 'My Personal Account';
  balance = 5824.76;
  currency = Currency.EUR;

  constructor(name: string, balance: number = 0, currency: Currency = Currency.EUR) {
    this.name = name;
    this.balance = balance;
    this.currency = currency;
  }
}
