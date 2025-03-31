import { User } from '@/domain/models/user.model';
import { db } from '../db';
import { Expense } from '@/domain/models/expense.model';

export async function fetchExpenses(userId: User['id']): Promise<Expense[]> {
  return await db.expense.findMany({
    where: { userId },
  });
}
