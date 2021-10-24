import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CoreModule} from "./core/core.module";
import {BbUIModule} from "./bb-ui/bb-ui.module";
import {UiModule} from "./ui/ui.module";
import {TransactionsModule} from "./transactions/transactions.module";
import {ModalModule} from "ngx-bootstrap/modal";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CoreModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    BbUIModule,
    UiModule,
    TransactionsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
