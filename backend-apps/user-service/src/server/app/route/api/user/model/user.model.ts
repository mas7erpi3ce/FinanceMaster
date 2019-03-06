
import { Schema, Model, model } from 'mongoose';
import { UserModel } from './user.model.interface';
import { NextFunction } from 'express-serve-static-core';
import * as bcrypt from 'bcrypt';

export const UserSchema: Schema = new Schema({
  userName: {
    type: String,
    required: 'Enter a username',
    unique: true,
  },
  password: {
    type: String,
    required: 'Enter a password',
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre<UserModel>("save", async function (next: NextFunction) {
  if (!this.isModified('password')) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.comparePassword = async function (pass: string): Promise<boolean> {
  return await bcrypt.compare(pass, this.password);
};

export const User: Model<UserModel> = model<UserModel>("User", UserSchema);

