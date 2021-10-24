import {Component, EventEmitter} from '@angular/core';
import {AccountService} from "../../services/account.service";
import {BsModalRef, BsModalService, ModalOptions} from "ngx-bootstrap/modal";
import {ReviewTransferModalComponent} from "../review-transfer-modal/review-transfer-modal.component";
import {TransactionsService} from "../../services/transactions.service";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import {overdraftValidator} from "../../validators";

@Component({
  selector: 'app-add-transaction-form',
  templateUrl: './add-transaction-form.component.html',
  styleUrls: ['./add-transaction-form.component.scss']
})
export class AddTransactionFormComponent {
  transactionForm: FormGroup;
  bsModalRef?: BsModalRef;

  constructor(
    private accountService: AccountService,
    private transactionsService: TransactionsService,
    private modalService: BsModalService,
    private fb: FormBuilder,
  ) {
    this.transactionForm = this.fb.group({
      ownAccountDetails: [{value: this.getOwnAccountDetails(), disabled: true}],
      targetAccountName: ['', Validators.required],
      amount: [null, [
        Validators.required,
        Validators.min(1),
        overdraftValidator(this.ownAccountBalance),
      ]],
    });
  }


  get ownAccountBalance(): number {
    return this.accountService.accountBalance;
  }

  get ownAccountDetails(): FormControl {
    return this.transactionForm.get('ownAccountDetails') as FormControl;
  }

  get targetAccountName(): FormControl {
    return this.transactionForm.get('targetAccountName') as FormControl;
  }

  get amount(): FormControl {
    return this.transactionForm.get('amount') as FormControl;
  }

  getOwnAccountDetails(): string {
    const {accountName, accountBalance, accountCurrency} = this.accountService;
    return accountName + ': ' + accountCurrency + ' ' + accountBalance.toFixed(2);
  }

  onSubmitForm(): void {
    this.triggerFormFieldsValidation();

    if (!this.transactionForm.valid) return;
    this.openModalWithComponent()?.subscribe(() => {
      const isTransferApproved = this.bsModalRef?.content.shouldSubmit;
      if (isTransferApproved) {
        this.transactionsService.addTransaction(this.targetAccountName.value, this.amount.value);
        this.resetForm();
      }
    });
  }

  triggerFormFieldsValidation(): void {
    this.targetAccountName.markAsTouched();
    this.amount.markAsTouched();
  }

  resetForm(): void {
    this.transactionForm.reset({
      ownAccountDetails: this.getOwnAccountDetails(),
    });
  }

  openModalWithComponent(): EventEmitter<unknown> | undefined {
    const config: ModalOptions = {
      initialState: {
        accountName: this.targetAccountName.value,
        amount: this.amount.value,
        shouldSubmit: false,
      }
    };
    this.bsModalRef = this.modalService.show(ReviewTransferModalComponent, config);
    return this.bsModalRef.onHidden;
  }
}
