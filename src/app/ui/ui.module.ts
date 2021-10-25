import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TopbarComponent} from './components/topbar/topbar.component';
import {BbUIModule} from "../bb-ui/bb-ui.module";
import {FormFieldComponent} from './components/form-field/form-field.component';

@NgModule({
  declarations: [
    TopbarComponent,
    FormFieldComponent,
  ],
  exports: [
    TopbarComponent,
    FormFieldComponent,
  ],
  imports: [
    CommonModule,
    BbUIModule
  ]
})
export class UiModule {
}
