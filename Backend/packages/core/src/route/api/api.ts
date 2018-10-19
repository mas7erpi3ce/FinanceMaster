
import { Router } from "express";
import router from "./user/user.router";


class Api {

  public router: Router;

  constructor() {
    this.router = Router();
    this.configRoutes();
  }

  private configRoutes(): void {
    this.router.use('/users', router);
  }

}

export default new Api().router;
