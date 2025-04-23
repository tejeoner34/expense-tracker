import { User } from '@/domain/models/user.model';
import { db } from '../db';
import { Expense, ExpenseCategory } from '@/domain/models/expense.model';

export async function fetchExpenses(userId: User['id']): Promise<Expense[]> {
  const expenses = await db.expense.findMany({
    where: { userId },
  });

  // Map database results to the Expense type
  return expenses.map((expense) => ({
    ...expense,
    category: expense.category as ExpenseCategory,
    currency: expense.currency as Expense['currency'],
    userId: Number(expense.userId),
  }));
}

export async function fetchExpensesByYear(userId: string, year: number): Promise<Expense[]> {
  const start = new Date(`${year}-01-01`);
  const end = new Date(`${year + 1}-01-01`);

  const expenses = await db.expense.findMany({
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

  // Map database results to the Expense type
  return expenses.map((expense) => ({
    ...expense,
    category: expense.category as ExpenseCategory,
    currency: expense.currency as Expense['currency'],
    userId: Number(expense.userId),
  }));
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
