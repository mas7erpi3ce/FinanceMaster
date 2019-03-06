
import { Request, Response } from 'express';
import { Bill } from './model/bill.model';
import { BillModel } from './model/bill.model.interface';

export class BillController {

  public async addNewBill(req: Request, res: Response): Promise<void> {
    try {
      console.log(req.body.uuID);
      const newBill = await new Bill(req.body).save();
      res.send(newBill);
    } catch (err) {
      res.send(err);
    }
  }

  public async getBill(req: Request, res: Response): Promise<void> {
    const bill: BillModel[] = await Bill.aggregate([{ $sample: { size: 1 } }]).exec();
    res.send(bill[0]);
  }

}
