import {Component, ViewChild} from '@angular/core';
import {AccountService} from "../../services/account.service";
import {BsModalRef, BsModalService, ModalOptions} from "ngx-bootstrap/modal";
import {ReviewTransferModalComponent} from "../review-transfer-modal/review-transfer-modal.component";
import {TransactionsService} from "../../services/transactions.service";

interface FormErrors {
  targetAccountName: string;
  amount: string;
}

@Component({
  selector: 'app-add-transaction-form',
  templateUrl: './add-transaction-form.component.html',
  styleUrls: ['./add-transaction-form.component.scss']
})
export class AddTransactionFormComponent {
  @ViewChild('form') form: any;
  formModel = {
    ownAccountName: '',
    targetAccountName: '',
    amount: 0,
  };
  bsModalRef?: BsModalRef;

  constructor(
    private accountService: AccountService,
    private transactionsService: TransactionsService,
    private modalService: BsModalService
  ) {
  }

  get accountName(): string {
    return this.accountService.accountName;
  }

  get accountBalance(): number {
    return this.accountService.accountBalance;
  }

  get accountCurrency(): string {
    return this.accountService.accountCurrency;
  }

  get ownAccountDetails(): string {
    const {accountName, accountBalance, accountCurrency} = this.accountService;
    return accountName + ': ' + accountCurrency + ' ' + accountBalance;
  }

  subtractFromBalance(): void {
    this.accountService.accountBalance -= 200;
  }

  onSubmitForm(): void {
    // TODO: do not open modal if form is invalid
    // targetAccountName:
    //  - required
    // amountL
    //  - required
    //  - positive number (floats are allowed)
    //  - can't decrease the balance below 500 EUR
    console.log(this.form.isValid);
    console.log(this.form.controls.amount);
    this.openModalWithComponent()
  }

  openModalWithComponent() {
    const initialState: ModalOptions = {
      initialState: {
        accountName: 'Backbase',
        amount: 5000,
        shouldSubmit: false,
      }
    };
    this.bsModalRef = this.modalService.show(ReviewTransferModalComponent, initialState);
    this.bsModalRef.onHidden?.subscribe((value) => {
      console.log('closed:', this.bsModalRef?.content.shouldSubmit);
      if (this.bsModalRef?.content.shouldSubmit) {
        this.transactionsService.addTransaction();
      }
    });
  }
}
