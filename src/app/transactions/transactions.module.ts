import {NgModule} from '@angular/core';
import {AddTransactionFormComponent} from './components/add-transaction-form/add-transaction-form.component';
import {CustomTransactionItemComponent} from './components/custom-transaction-item/custom-transaction-item.component';
import {TransactionsListComponent} from './components/transactions-list/transactions-list.component';
import {BbUIModule} from "../bb-ui/bb-ui.module";
import {CoreModule} from "../core/core.module";

const components = [
  AddTransactionFormComponent,
  CustomTransactionItemComponent,
  TransactionsListComponent,
]

@NgModule({
  declarations: components,
  imports: [
    CoreModule,
    BbUIModule
  ],
  exports: components,
})
export class TransactionsModule {
}
