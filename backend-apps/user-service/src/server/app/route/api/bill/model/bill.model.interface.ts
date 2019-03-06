
import { Document } from 'mongoose';
import { Bill } from '../bill.interface';

export interface BillModel extends Bill, Document {
  createdAt: Date;
  evaluated: boolean;
}