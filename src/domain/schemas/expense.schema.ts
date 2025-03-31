import { z } from 'zod';

export const expenseSchema = z.object({
  id: z.string().optional(),
  userId: z.string(),
  category: z.string(),
  amount: z.number().positive(),
  description: z.string().min(1).max(100),
  defaultCurrencyAmount: z.number().positive(),
  currency: z.string(),
  date: z
    .string()
    .transform((val) => new Date(val))
    .optional(),
});
