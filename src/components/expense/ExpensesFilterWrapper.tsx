'use client';

import ExpensesFilters from './ExpensesFilters.component';
import ExpensesList from './ExpensesList.component';
import CategoriesChart from './CategoriesChart.component';
import MonthlyExpenseChart from './MonthlyExpenseChart.component';
import DailyExpenseChart from './DailyExpenseChart.component';
import { useFilter } from '@/app/hooks/useFilter';

type Props = {
  userId: string;
  years: number[];
};

const ExpensesFilterWrapper = ({ userId, years }: Props) => {
  const { selectedYear, setSelectedYear, expenses } = useFilter({
    userId,
    initialYear: new Date().getFullYear(),
  });

  return (
    <div>
      <ExpensesFilters years={years} selectedYear={selectedYear} onFilter={setSelectedYear} />
      <ExpensesList expensesList={expenses} />
      <div className="h-96 w-full">
        <CategoriesChart expensesList={expenses} />
      </div>
      <div className="h-96 w-full">
        <MonthlyExpenseChart expensesList={expenses} />
      </div>
      <div className="h-96 w-full">
        <DailyExpenseChart expensesList={expenses} />
      </div>
    </div>
  );
};

export default ExpensesFilterWrapper;
