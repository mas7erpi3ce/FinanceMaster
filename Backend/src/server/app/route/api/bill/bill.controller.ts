
import { Request, Response } from 'express';
import { Bill } from './model/bill.model';

export class BillController {

  public async addNewBill(req: Request, res: Response) {
    try {
      console.log(req.body.uuID);
      const newBill = await new Bill(req.body).save();
      res.send(newBill);
    } catch (err) {
      res.send(err);
    }
  }

}
