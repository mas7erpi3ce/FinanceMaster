import { Component, ViewChild, ElementRef, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { switchMap, takeUntil, pairwise, tap } from 'rxjs/operators';
import { BillService } from 'src/app/services/bill-service/bill.service';
import { Bill } from 'src/app/services/bill-service/bill.interface';
import { BillInfo } from 'src/app/services/bill-service/billInfo.interface';


interface CanvasCircle {
  x: number;
  y: number;
  r: number;
}

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements AfterViewInit, OnDestroy {
  @ViewChild('billCanvas') canvas: ElementRef<HTMLCanvasElement>;
  @Input() width = 712;
  @Input() height = 812;

  bill: Bill;
  ctx: CanvasRenderingContext2D;
  drawingSubscription: Subscription;
  canvasElements = new Array<CanvasCircle>();
  clickedElement: CanvasCircle;
  image: HTMLImageElement;

  constructor(
    private billService: BillService
  ) { }

  ngAfterViewInit() {
    this.initCanvas();
    this.getAndDrawBill();
  }

  ngOnDestroy() {
    this.drawingSubscription.unsubscribe();
  }

  sendBillInfo() {
    const points = this.canvasElements.map(el => ({ x: el.x / this.width, y: el.y / this.height }));
    const billInfo: BillInfo = {
      billID: this.bill._id,
      points: {
        point1: points[0],
        point2: points[1],
        point3: points[2],
        point4: points[3],
      }
    };

    this.canvasElements = [];
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.billService.updateBill(billInfo).subscribe(() => {
      this.getAndDrawBill();
    });
  }

  private initCanvas(): void {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.ctx = canvasEl.getContext('2d');
    canvasEl.width = this.width;
    canvasEl.height = this.height;

    // set some default properties about the line
    this.ctx.lineWidth = 3;
    this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = '#e9ff6f';

    this.captureEvents(canvasEl);
  }

  private getAndDrawBill(): void {
    this.billService.getBill()
      .subscribe(bill => {
        this.bill = bill;
        this.image = new Image();
        this.image.src = `data:image/jpeg;base64,${this.bill.base64String}`;
        this.image.onload = () => this.ctx.drawImage(this.image, 0, 0, this.width, this.height);
      });
  }

  private captureEvents(canvasEl: HTMLCanvasElement) {
    // this will capture all mousedown events from teh canvas element
    this.drawingSubscription = fromEvent(canvasEl, 'mousedown')
      .pipe(
        switchMap((event: MouseEvent) => {
          const rect = canvasEl.getBoundingClientRect();

          if (!this.isElementClicked(event, rect)) {

            return fromEvent(canvasEl, 'mouseup').pipe(
              tap((res: MouseEvent) => this.addCircle(res, rect))
            );

          } else {

            return fromEvent(canvasEl, 'mousemove').pipe(
              takeUntil(fromEvent(canvasEl, 'mouseup')),
              takeUntil(fromEvent(canvasEl, 'mouseleave')),
              tap((res: MouseEvent) => {
                this.clickedElement.x = res.clientX - rect.left;
                this.clickedElement.y = res.clientY - rect.top;
              })

            );
          }
        })
      )
      .subscribe(_ => this.drawOnCanvas());
  }

  private addCircle(event: MouseEvent, rect: ClientRect): void {
    if (this.canvasElements.length < 4) {
      this.canvasElements.push(
        {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
          r: 4
        }
      );
    }
  }

  private isElementClicked(event: MouseEvent, rect: ClientRect): boolean {

    const found = this.canvasElements.find((element) => {
      const x = element.x + rect.left;
      const y = element.y + rect.top;
      const r = element.r + 3;
      return x - r < event.clientX && x + r > event.clientX && y - r < event.clientY && y + r > event.clientY;
    });

    if (found) {
      this.clickedElement = found;
      return true;
    } else {
      return false;
    }
  }

  private drawOnCanvas(): void {
    this.ctx.drawImage(this.image, 0, 0, this.width, this.height);
    this.ctx.beginPath();
    this.canvasElements.forEach(el => {
      this.ctx.arc(el.x, el.y, el.r, 0, 360);
      this.ctx.moveTo(el.x, el.y);
    });
    this.ctx.lineTo(this.canvasElements[0].x, this.canvasElements[0].y);
    this.ctx.stroke();
  }
}
