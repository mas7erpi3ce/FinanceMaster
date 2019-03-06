
import { UserController } from "./user.controller";
import * as express from "express";


class UserRouter {

  public userController: UserController = new UserController();
  public router: express.Router;

  constructor() {
    this.router = express.Router();
    this.configRoutes();
  }

  private configRoutes(): void {
    this.router.route('/')
      .get(this.userController.getUsers)
      .post(this.userController.addNewUser)

    this.router.route('/login')
      .post(this.userController.login);

    this.router.route('/:userId')
      .put(this.userController.updateUser)
  }

}

export default new UserRouter().router;
