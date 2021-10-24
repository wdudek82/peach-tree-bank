import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function overdraftValidator(amount: number, debitLimit: number = -500): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isOverdraft = (amount - control.value) < debitLimit;
    const overdraftAmount = control.value  + debitLimit - amount;
    return isOverdraft ? {overdraft: {value: overdraftAmount.toFixed(2)}} : null;
  };
}
