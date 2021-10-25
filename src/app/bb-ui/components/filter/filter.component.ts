import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  @Output() inputChange: EventEmitter<any> = new EventEmitter();

  onInputChange(event: KeyboardEvent): void {
    const value = (event.target as HTMLInputElement)?.value || '';
    this.inputChange.emit(value);
  }
}
