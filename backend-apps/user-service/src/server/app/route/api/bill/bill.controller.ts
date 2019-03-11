
import { Request, Response } from 'express';
import { Bill } from './model/bill.model';
import { BillModel } from './model/bill.model.interface';
import { AiScannerService } from '../../../service/ai-scanner.service';

export class BillController {

  public async addNewBill(req: Request, res: Response): Promise<void> {
    try {
      console.log(req.body.uuID);
      const newBill = await new Bill(req.body).save();

      const r = await AiScannerService.sendBill({
        billID: newBill.id,
        base64String: newBill.base64String,
      })

      // TODO -> save returned image #37

      res.send(newBill);
    } catch (err) {
      res.send(err);
    }
  }

  public async getBill(req: Request, res: Response): Promise<void> {
    const bill: BillModel = await Bill.findOne({ evaluated: false }).exec();
    res.send(bill);
  }

  public async updateBill(req: Request, res: Response): Promise<void> {

    const r = await AiScannerService.updateBill(req.body.points, req.body.billID)

    const bill = await Bill.findByIdAndUpdate(req.body.billID, { evaluated: true }, { new: true }).exec()
    console.log(r)

    res.send()
  }

}
