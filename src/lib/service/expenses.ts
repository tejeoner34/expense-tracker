import { User } from '@/domain/models/user.model';
import { db } from '../db';
import { Expense } from '@/domain/models/expense.model';

export async function fetchExpenses(userId: User['id']): Promise<Expense[]> {
  return await db.expense.findMany({
    where: { userId },
  });
}
export async function fetchExpensesByYear(userId: string, year: number): Promise<Expense[]> {
  const start = new Date(`${year}-01-01`);
  const end = new Date(`${year + 1}-01-01`);

  return db.expense.findMany({
    where: {
      userId,
      date: {
        gte: start,
        lt: end,
      },
    },
    orderBy: {
      date: 'desc',
    },
  });
}

export async function fetchAvailableYears(userId: string): Promise<number[]> {
  const result = await db.expense.findMany({
    where: {
      userId,
    },
    select: {
      date: true,
    },
  });

  const years = Array.from(new Set(result.map((r) => new Date(r.date).getFullYear()))).sort(
    (a, b) => b - a
  );

  return years;
}
