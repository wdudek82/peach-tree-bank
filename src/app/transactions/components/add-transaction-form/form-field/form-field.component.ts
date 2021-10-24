import {Component, Input, ViewChild} from '@angular/core';
import {
  ControlContainer,
  ControlValueAccessor,
  FormControl,
  FormControlDirective,
  NG_VALUE_ACCESSOR
} from "@angular/forms";

type InputType = 'text' | 'number';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FormFieldComponent,
      multi: true
    }
  ]
})
export class FormFieldComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() type: InputType = 'text';
  @Input() placeholder = '';
  @Input() formControlName!: string;
  @Input() formControl!: FormControl;
  @Input() isCurrency = false;
  @ViewChild(FormControlDirective, {static: true})

  value: unknown;
  formControlDirective!: FormControlDirective;

  onChange = () => {};
  onTouched = () => {};

  constructor() { }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }

  // setDisabledState(isDisabled: boolean): void {
  //   this.formControlDirective.valueAccessor?.setDisabledState(isDisabled);
  // }
}
