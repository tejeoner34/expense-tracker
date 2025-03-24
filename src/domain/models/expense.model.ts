import { currencies } from '@/data/currencies';
import { User } from './user.model';

export interface Expense {
  id: number;
  name: string;
  amount: number;
  date: Date;
  description?: string;
  category: string;
  currency: Currency;
  user: User;
  userId: number;
}

export type Currency = (typeof currencies)[number];
