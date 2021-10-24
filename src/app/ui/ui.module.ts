import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TopbarComponent} from './components/topbar/topbar.component';
import {BbUIModule} from "../bb-ui/bb-ui.module";

@NgModule({
  declarations: [
    TopbarComponent,
  ],
  exports: [
    TopbarComponent,
  ],
  imports: [
    CommonModule,
    BbUIModule
  ]
})
export class UiModule {
}
