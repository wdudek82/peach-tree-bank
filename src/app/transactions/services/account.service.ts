import { Injectable } from '@angular/core';
import {Account} from "../models/account";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  account: Account;

  constructor() {
    this.account = new Account('My Personal Account', 5824.76);
  }
}
