import {Component, EventEmitter, ViewChild} from '@angular/core';
import {AccountService} from "../../services/account.service";
import {BsModalRef, BsModalService, ModalOptions} from "ngx-bootstrap/modal";
import {ReviewTransferModalComponent} from "../review-transfer-modal/review-transfer-modal.component";
import {TransactionsService} from "../../services/transactions.service";

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
    amount: '',
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

  get targetAccountName(): string {
    return this.form.controls.targetAccountName.value;
  }

  get amount(): number {
    return this.form.controls.amount.value;
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

    if (this.form.invalid) return;
    this.openModalWithComponent()?.subscribe(() => {
      const isTransferApproved =  this.bsModalRef?.content.shouldSubmit;
      if (isTransferApproved) {
        this.transactionsService.addTransaction(this.targetAccountName, this.amount);
        // TODO: reset form
      }
    });
  }

  openModalWithComponent(): EventEmitter<unknown> | undefined {
    const config: ModalOptions = {
      initialState: {
        accountName: this.form.controls.targetAccountName.value,
        amount: this.form.controls.amount.value,
        shouldSubmit: false,
      }
    };
    this.bsModalRef = this.modalService.show(ReviewTransferModalComponent, config);
    return this.bsModalRef.onHidden;
  }
}
