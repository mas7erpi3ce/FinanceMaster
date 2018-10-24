
import { Request, Response } from 'express';
import { User } from './user.model';
import { UserModel } from './user.model.interface';

export class UserController {

  public addNewUser(req: Request, res: Response) {
    let newUser = new User(req.body);

    newUser.save((err: any, user: UserModel) => {
      if (err) {
        res.send(err);
      }
      res.json(user);
    });
  }

  public getUsers(res: Response) {
    User.find({}, (err: any, users: UserModel[]) => {
      if (err) {
        res.send(err);
      }
      res.json(users);
    });
  }

  public updateUser(req: Request, res: Response) {
    User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true }, (err: any, user: UserModel) => {
      if (err) {
        res.send(err);
      }
      res.json(user);
    });
  }


}
