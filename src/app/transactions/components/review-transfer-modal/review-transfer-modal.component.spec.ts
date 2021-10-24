import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewTransferModalComponent } from './review-transfer-modal.component';

describe('ReviewTransferModalComponent', () => {
  let component: ReviewTransferModalComponent;
  let fixture: ComponentFixture<ReviewTransferModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewTransferModalComponent ]
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
