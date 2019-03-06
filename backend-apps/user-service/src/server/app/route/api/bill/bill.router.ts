
import * as express from "express";
import { BillController } from "./bill.controller";

class BillRouter {

  public billController: BillController = new BillController();
  public router: express.Router;

  constructor() {
    this.router = express.Router();
    this.configRoutes();
  }

  private configRoutes(): void {
    this.router.route('/')
      .post(this.billController.addNewBill)
      .get(this.billController.getBill)
  }

}

export default new BillRouter().router;
