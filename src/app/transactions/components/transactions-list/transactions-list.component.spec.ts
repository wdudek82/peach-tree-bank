import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TransactionsListComponent} from './transactions-list.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FilterComponent} from "../../../bb-ui/components/filter/filter.component";

describe('TransactionsListComponent', () => {
  let component: TransactionsListComponent;
  let fixture: ComponentFixture<TransactionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [TransactionsListComponent, FilterComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
