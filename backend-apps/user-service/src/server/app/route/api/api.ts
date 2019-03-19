
import { Router } from "express";
import { default as userRouter } from "./user/user.router";
import { default as billRouter } from "./bill/bill.router";
import { Auth } from "../../middleware/auth";


class Api {

  public router: Router;

  constructor() {
    this.router = Router();
    this.configRoutes();
  }

  private configRoutes(): void {
    this.router.use('/users', userRouter);
    this.router.use('/bills', Auth.test, billRouter);
  }

}

export default new Api().router;
