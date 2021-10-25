import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomTransactionItemComponent } from './custom-transaction-item.component';
import {TransactionDetails} from "../../../models/transaction-data";

describe('CustomTransactionItemComponent', () => {
  let component: CustomTransactionItemComponent;
  let fixture: ComponentFixture<CustomTransactionItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomTransactionItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomTransactionItemComponent);
    component = fixture.componentInstance;
    component.transactionDetails = new TransactionDetails('Test Account', 100);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
