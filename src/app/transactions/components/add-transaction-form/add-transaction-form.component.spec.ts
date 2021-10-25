import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AddTransactionFormComponent} from './add-transaction-form.component';
import {TransactionsService} from "../../services/transactions.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {BsModalService} from "ngx-bootstrap/modal";
import {ReactiveFormsModule} from "@angular/forms";

describe('AddTransactionFormComponent', () => {
  let component: AddTransactionFormComponent;
  let fixture: ComponentFixture<AddTransactionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      declarations: [AddTransactionFormComponent],
      providers: [TransactionsService, BsModalService],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTransactionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
