import { Injectable } from '@angular/core';

export enum Currency {
  EUR = '€',
  USD = '$;',
}

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private _accountName = 'My Personal Account';
  private _accountBalance = 5824.76;
  private _accountCurrency = Currency.EUR;

  constructor() {
  }

  get accountName(): string {
    return this._accountName;
  }

  get accountBalance(): number {
    return this._accountBalance;
  }

  get accountCurrency(): Currency {
    return this._accountCurrency;
  }

  set accountBalance(amount) {
    this._accountBalance = amount;
  }
}
