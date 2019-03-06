import { Component, OnInit } from '@angular/core';
import { BillService } from 'src/app/services/bill-service/bill.service';
import Tesseract from '../../../../node_modules/tesseract.js/dist/tesseract.js';
import { Bill } from 'src/app/services/bill-service/bill.interface.js';

@Component({
  selector: 'app-ocr',
  templateUrl: './ocr.component.html',
  styleUrls: ['./ocr.component.scss']
})
export class OcrComponent implements OnInit {

  bill: Bill;

  constructor(
    private billService: BillService
  ) { }

  ngOnInit() {
    this.billService.getBill().subscribe(bill => {
      this.bill = bill;
      const image = new Image();
      image.src = `data:image/jpeg;base64,${bill.base64String}`;
      image.onload = () => {
        Tesseract
          .recognize(image, { lang: 'deu' })
          .progress(message => console.log(message))
          .catch(err => console.error(err))
          .then(result => console.log(result))
          .finally(resultOrError => console.log(resultOrError));
      };
    });


  }

}
