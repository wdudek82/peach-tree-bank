import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TopbarComponent} from './components/topbar/topbar.component';
import {BbUIModule} from "../bb-ui/bb-ui.module";
import {MainFooterComponent} from './components/main-footer/main-footer.component';

@NgModule({
  declarations: [
    TopbarComponent,
    MainFooterComponent
  ],
  exports: [
    TopbarComponent,
    MainFooterComponent,
  ],
  imports: [
    CommonModule,
    BbUIModule
  ]
})
export class UiModule {
}
