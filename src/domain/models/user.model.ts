import { Currency } from './expense.model';

export interface User {
  id: string;
  email: string;
  password?: string;
  createdAt: Date;
  defaultCurrency: Currency;
}
