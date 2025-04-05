import { User } from '@prisma/client';
import { db } from './db';

export async function fetchExpenses(userId: User['id']) {
  return await db.expense.findMany({
    where: { userId },
  });
}
