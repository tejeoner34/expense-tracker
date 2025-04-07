import { Expense } from '@/domain/models/expense.model';
import { getMonthName } from '../dates/date';

const groupExpensesByMonth = (expenses: Expense[]) => {
  return expenses.reduce((acc, expense: Expense) => {
    const month = getMonthName(expense.date);
    const existing = acc.find((item) => item.month === month);
    if (existing) {
      existing.total += expense.defaultCurrencyAmount;
    } else {
      acc.push({ month, total: expense.defaultCurrencyAmount });
    }
    return acc;
  }, [] as { month: string; total: number }[]);
};

export const getMonthlyDataSorted = (expenses: Expense[]) => {
  const groupedData = groupExpensesByMonth(expenses);
  return groupedData.sort((a, b) => (a.month > b.month ? 1 : -1));
};
