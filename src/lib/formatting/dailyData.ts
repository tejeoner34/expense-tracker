import { Expense } from '@/domain/models/expense.model';

const getDateKey = (date: Date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const day = d.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getDailyExpensesMap = (expenses: Expense[]) => {
  const dailyMap = new Map<string, number>();

  for (const expense of expenses) {
    const key = getDateKey(expense.date);
    dailyMap.set(key, (dailyMap.get(key) || 0) + expense.defaultCurrencyAmount);
  }
  return dailyMap;
};

export const getDailyData = (expenses: Expense[]) => {
  const dailyMap = getDailyExpensesMap(expenses);
  return Array.from(dailyMap.entries())
    .map(([date, total]) => ({ date, total }))
    .sort((a, b) => a.date.localeCompare(b.date));
};
