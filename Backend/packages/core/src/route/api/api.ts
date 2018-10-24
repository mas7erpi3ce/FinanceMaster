
import { Router } from "express";
import { default as userRouter } from "./user/user.router";


class Api {

  public router: Router;

  constructor() {
    this.router = Router();
    this.configRoutes();
  }

  private configRoutes(): void {
    this.router.use('/users', userRouter);
  }

}

export default new Api().router;
