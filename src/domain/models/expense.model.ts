import { currencies } from '@/data/currencies';
import {
  Utensils,
  Car,
  Home,
  Lightbulb,
  Music,
  ShoppingBag,
  HeartPulse,
  Plane,
  MoreHorizontal,
} from 'lucide-react';

export interface Expense {
  id: string;
  amount: number;
  date: Date;
  description: string;
  category: ExpenseCategory;
  currency: Currency;
  userId: number;
  defaultCurrencyAmount: number;
}

export type Currency = (typeof currencies)[number];

export const expenseCategories = [
  { id: 'other', name: 'Other', icon: MoreHorizontal },
  { id: 'food', name: 'Food', icon: Utensils },
  { id: 'transport', name: 'Transport', icon: Car },
  { id: 'housing', name: 'Housing', icon: Home },
  { id: 'utilities', name: 'Utilities', icon: Lightbulb },
  { id: 'entertainment', name: 'Entertainment', icon: Music },
  { id: 'shopping', name: 'Shopping', icon: ShoppingBag },
  { id: 'health', name: 'Health', icon: HeartPulse },
  { id: 'travel', name: 'Travel', icon: Plane },
] as const;

export type ExpenseCategory = (typeof expenseCategories)[number]['id'];
