import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function overdraftValidator(obj: any, propertyName: string, debitLimit: number = -500): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const balance: number = obj[propertyName];
    const amount: number = control.value;
    const isOverdraft = (balance - amount) < debitLimit;
    const overdraftAmount = amount  + debitLimit - balance;
    return isOverdraft ? {overdraft: {value: overdraftAmount.toFixed(2)}} : null;
  };
}
