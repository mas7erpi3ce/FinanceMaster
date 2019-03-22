
import { Schema, Model, model } from 'mongoose';
import { NextFunction } from 'express-serve-static-core';
import { BillModel } from './bill.model.interface';

export const BillSchema: Schema = new Schema({
  uuID: {
    type: String,
    required: 'uuID is required',
  },
  base64String: {
    type: String,
    required: 'base64String is required',
  },
  evaluated: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

BillSchema.pre<BillModel>("save", async function (next: NextFunction) {
  console.log("new bill created \n uuID: ", this.uuID);
  next();
});


export const Bill: Model<BillModel> = model<BillModel>("Bill", BillSchema);

