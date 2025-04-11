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
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <div className="w-50">
        <ExpensesFilters years={years} selectedYear={selectedYear} onFilter={setSelectedYear} />
      </div>

      <div className="bg-white shadow rounded-2xl p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <ExpensesList expensesList={expenses} />
          </div>
          <div className="h-72 md:h-80 w-full">
            <CategoriesChart expensesList={expenses} />
          </div>
          <div className="h-72 md:h-80 w-full">
            <MonthlyExpenseChart expensesList={expenses} />
          </div>
          <div className="h-72 md:h-80 w-full">
            <DailyExpenseChart expensesList={expenses} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpensesFilterWrapper;
