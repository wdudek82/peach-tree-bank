import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AddTransactionFormComponent} from './add-transaction-form.component';
import {TransactionsService} from "../../services/transactions.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {ReactiveFormsModule} from "@angular/forms";
import {SubmitButtonComponent} from "../../../bb-ui/components/submit-button/submit-button.component";
import {findByCss} from "../../../../spec-utils";
import {DebugElement} from "@angular/core";
import {ReviewTransferModalComponent} from "../review-transfer-modal/review-transfer-modal.component";

describe('AddTransactionFormComponent', () => {
  let component: AddTransactionFormComponent;
  let fixture: ComponentFixture<AddTransactionFormComponent>;
  let debugEl: DebugElement;
  const MAX_OVERDRAFT = 500;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      declarations: [AddTransactionFormComponent, SubmitButtonComponent, ReviewTransferModalComponent],
      providers: [TransactionsService, BsModalService, BsModalRef],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTransactionFormComponent);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders my account field with prefilled details and disabled', () => {
    const fromAccountInputDbEl = findByCss(fixture, '#from-account');
    const ownAccountDetails = component.getOwnAccountDetails();
    expect(fromAccountInputDbEl.nativeElement.value).toBe(ownAccountDetails);
    expect(fromAccountInputDbEl.nativeElement.disabled).toBeTrue();
  });

  it('uses correct validation and default value on "to account" field and field is enabled', () => {
    const toAccount = component.targetAccountNameControl;
    // Is enabled
    expect(toAccount.disabled).toBeFalse();
    // Correct default
    expect(toAccount.value).toBe('');
    // Is required
    toAccount.setValue(null);
    expect(toAccount.hasError('required')).toBeTrue();
  });

  it('uses correct validation and default value on "amount" field and field is enabled', () => {
    const amountControl = component.amountControl;
    // Is enabled
    expect(amountControl.disabled).toBeFalse();
    // Is required
    amountControl.setValue(null);
    expect(amountControl.hasError('required')).toBeTrue();
    // Less than 0.01 is not allowed
    amountControl.setValue(0);
    expect(amountControl.hasError('min')).toBeTrue();
    expect(amountControl.getError('min')).toEqual({min: 0.01, actual: 0});
  });

  [
    {exceededOverdraft: 0.1},
    {exceededOverdraft: 1},
    {exceededOverdraft: 123},
    {exceededOverdraft: 1000.01},
  ].forEach(({exceededOverdraft}) => {
    it(`shows correct error if amount overdrafts the account balance by ${exceededOverdraft}`, () => {
      const account = component['accountService'].account;
      const amountControl = component.amountControl;
      amountControl.setValue(account.balance + MAX_OVERDRAFT + exceededOverdraft);
      expect(amountControl.getError('overdraft')).toEqual({value: exceededOverdraft});
    });
  })
});
