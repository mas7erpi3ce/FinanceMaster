
import { User } from "./user.interface";
import { Document } from 'mongoose';

export interface UserModel extends User, Document {
  createdAt: Date;
  comparePassword(password: string): boolean;
}