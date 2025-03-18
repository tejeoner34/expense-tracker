import { User } from './user.model';

export interface Expense {
  id: number;
  name: string;
  amount: number;
  date: Date;
  description?: string;
  category: string;
  currency: string;
  user: User;
  userId: number;
}
