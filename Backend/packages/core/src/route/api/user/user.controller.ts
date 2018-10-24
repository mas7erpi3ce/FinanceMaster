
import { Request, Response } from 'express';
import { User } from './user.model';

export class UserController {

  public addNewUser(req: Request, res: Response) {
    let newUser = new User(req.body);

    newUser.save((err, user) => {
      if (err) {
        res.send(err);
      }
      res.json(user);
    });
  }

  public getUsers(res: Response) {
    User.find({}, (err, user) => {
      if (err) {
        res.send(err);
      }
      res.json(user);
    });
  }

  public updateUser(req: Request, res: Response) {
    User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true }, (err, user) => {
      if (err) {
        res.send(err);
      }
      res.json(user);
    });
  }


}
