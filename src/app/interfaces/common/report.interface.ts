import { Product } from './product.interface';
import { User } from './user.interface';

export interface Report {
  _id?: string;
  image?: string;
  user?:User;
  product?:Product;
  name?: string;
  reportDate: string;
  report: string;
  rating: number;
  status: boolean;
  reply: string;
  replyDate: string;
  select?: boolean;
}
