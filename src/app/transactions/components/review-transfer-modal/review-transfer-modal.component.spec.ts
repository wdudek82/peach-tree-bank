import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ReviewTransferModalComponent} from './review-transfer-modal.component';
import {BsModalRef, ModalModule} from "ngx-bootstrap/modal";

describe('ReviewTransferModalComponent', () => {
  let component: ReviewTransferModalComponent;
  let fixture: ComponentFixture<ReviewTransferModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalModule.forRoot()],
      declarations: [ReviewTransferModalComponent],
      providers: [
        BsModalRef,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewTransferModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
