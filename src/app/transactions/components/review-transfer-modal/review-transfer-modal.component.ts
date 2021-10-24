import {Component, OnInit} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-review-transfer-modal',
  templateUrl: './review-transfer-modal.component.html',
  styleUrls: ['./review-transfer-modal.component.scss']
})
export class ReviewTransferModalComponent implements OnInit {
  accountName!: string;
  amount!: number;
  shouldSubmit = false;

  constructor(public bsModalRef: BsModalRef) {
  }

  ngOnInit() {
  }

  confirm(): void {
    this.shouldSubmit = true;
    this.bsModalRef?.hide();
  }

  decline(): void {
    this.shouldSubmit = false;
    this.bsModalRef?.hide();
  }
}
