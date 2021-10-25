import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

type InputType = 'text' | 'number';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormFieldComponent),
      multi: true,
    }
  ]
})
export class FormFieldComponent implements ControlValueAccessor {
  @Input() id!: string;
  @Input() label = '';
  @Input() control!: AbstractControl;
  @Input() placeholder = '';
  @Input() type: InputType = 'text';
  @Output() changed = new EventEmitter<any>();
  value: any;
  isDisabled = false;
  private onChange: Function = () => {
  };
  private onTouched: Function = () => {
  };

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(value: any): void {
    this.value = value;
  }

  setDisabledState(isDisabled: boolean): void {
  }

  onKeyup(event: KeyboardEvent): void {
    this.value = (event.target as HTMLInputElement).value;
    this.onChange(this.value);
    this.changed.emit(this.value);
  }

  onBlur(): void {
    this.onTouched();
  }

  get errorKey(): string {
    const result = (this.control.errors && Object.keys(this.control.errors)[0]) ?? '';
    console.log('error result:', result, 'errors:', this.control.errors);
    return result;
  }

  hasError(): boolean {
    return (this.control.errors && (this.control.dirty || this.control.touched)) ?? false;
  }
}
