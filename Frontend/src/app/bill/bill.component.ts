import { Component, OnInit } from '@angular/core';
import { BillService } from '../services/bill.service';
import { Bill } from '../services/bill.interface';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {

  bill: Bill;

  constructor(
    private billService: BillService
  ) { }

  getBill(): void {
    this.billService.getBill()
      .subscribe(bill => this.bill = bill);
  }

  ngOnInit() {
    this.getBill();
  }

}
