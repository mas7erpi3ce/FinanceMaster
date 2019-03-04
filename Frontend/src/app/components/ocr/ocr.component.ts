import { Component, OnInit } from '@angular/core';
import { BillService } from 'src/app/services/bill.service';
import { Bill } from 'src/app/services/bill.interface';
import * as Tesseract from 'tesseract.js';

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
      const image = new Image();
      image.src = `data:image/jpeg;base64,${bill.base64String}`;
      image.onload = () => {
        Tesseract
          .recognize(image)
          .progress(message => console.log(message))
          .catch(err => console.error(err))
          .then(result => console.log(result))
          .finally(resultOrError => console.log(resultOrError));
      };
    });


  }

}
