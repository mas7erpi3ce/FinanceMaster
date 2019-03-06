
import { Request, Response } from 'express';
import { User } from './model/user.model';
import { UserModel } from './model/user.model.interface';

export class UserController {

  public async addNewUser(req: Request, res: Response) {
    try {
      let newUser = await new User(req.body).save();
      res.send(newUser)
    } catch (err) {
      res.send(err);
    }
  }

  public async login(req: Request, res: Response) {
    res.send(await User.findOne({ userName: req.body.userName }).exec())
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
