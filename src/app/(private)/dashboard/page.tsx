import { routes } from '@/app/routes/routes';
import CategoriesChart from '@/components/expense/CategoriesChart.component';
import ExpensesList from '@/components/expense/ExpensesList.component';
import { Button } from '@/components/ui/button';
import { serverSideGuard } from '@/lib/guards/serverSide';
import { fetchExpenses } from '@/lib/service/expenses';
import Link from 'next/link';

const DashboardPage = async () => {
  const session = await serverSideGuard();
  const expenses = await fetchExpenses(session.user.id);

  return (
    <div>
      <div>
        <ExpensesList expensesList={expenses} />
      </div>
      <div className="h-96 w-full">
        <CategoriesChart expensesList={expenses} />
      </div>
      {/*
      <MonthlyExpenseChart />
      <CategoriesChart />
      <DailyExpenseChart /> */}

      <div className="flex justify-end z-100 fixed bottom-0 p-9 w-full">
        <Link href={routes.addExpense}>
          <Button>New Expense</Button>
        </Link>
      </div>
    </div>
  );
};

export default DashboardPage;
