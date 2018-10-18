import { Request, Response } from "express";
import { UserController } from "./user/user.controller";

export class Routes {

  public userController: UserController = new UserController();

  public routes(app): void {

    app.route('/')
      .get((req: Request, res: Response) => {
        res.status(200).send({
          message: 'GET request successfulll!!!!'
        })
      })

    // User 
    app.route('/user')
      .get(this.userController.getUsers)
      .post(this.userController.addNewUser)

    // user detail
    app.route('/user/:userId')
      .put(this.userController.updateUser)

  }
}