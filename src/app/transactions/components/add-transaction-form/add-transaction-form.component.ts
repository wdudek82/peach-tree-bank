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
import {overdraftValidator} from "../../validators/overdraft.validator";

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
    this.transactionForm = this.createForm();
  }

  createForm(): FormGroup {
    return this.fb.group({
      ownAccountDetails: [{value: this.getOwnAccountDetails(), disabled: true}],
      targetAccountName: ['', Validators.required],
      amount: [null, [
        Validators.required,
        Validators.min(0.01),
        overdraftValidator(this.accountService.account, 'balance'),
      ]],
    });
  }

  get targetAccountNameControl(): FormControl {
    return this.transactionForm.get('targetAccountName') as FormControl;
  }

  get amountControl(): FormControl {
    return this.transactionForm.get('amount') as FormControl;
  }

  getOwnAccountDetails(): string {
    const {name, balance, currency} = this.accountService.account;
    return name + ': ' + currency + ' ' + balance.toFixed(2);
  }

  onSubmitForm(): void {
    this.triggerFormFieldsValidation();

    if (!this.transactionForm.valid) return;
    this.openModalWithComponent()?.subscribe(() => {
      const isTransferApproved = this.bsModalRef?.content.shouldSubmit;
      if (isTransferApproved) {
        this.transactionsService.addTransaction(this.targetAccountNameControl.value, this.amountControl.value);
        this.resetForm();
      }
    });
  }

  triggerFormFieldsValidation(): void {
    this.targetAccountNameControl.markAsTouched();
    this.amountControl.markAsTouched();
  }

  resetForm(): void {
    this.transactionForm.reset({
      ownAccountDetails: this.getOwnAccountDetails(),
    });
  }

  hasErrors(control: FormControl): boolean {
    return (control.errors && (control.dirty || control.touched)) ?? false;
  }

  openModalWithComponent(): EventEmitter<unknown> | undefined {
    const config: ModalOptions = {
      initialState: {
        accountName: this.targetAccountNameControl.value,
        amount: this.amountControl.value,
        shouldSubmit: false,
      }
    };
    this.bsModalRef = this.modalService.show(ReviewTransferModalComponent, config);
    return this.bsModalRef.onHidden;
  }
}
