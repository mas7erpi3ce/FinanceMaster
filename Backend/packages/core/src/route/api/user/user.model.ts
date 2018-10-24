
import { Schema, Model, model } from 'mongoose';
import { UserModel } from './user.model.interface';
import { NextFunction } from 'express-serve-static-core';

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

UserSchema.pre<UserModel>("save", function (next: NextFunction) {
  if (!this.isModified('password')) {
    next();
  }
  next();
  //implement bcrypt
});

UserSchema.methods.comparePassword = function (): boolean {
  //implement bcrypt
  return true
};

export const User: Model<UserModel> = model<UserModel>("User", UserSchema);

