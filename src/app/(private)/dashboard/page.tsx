import { routes } from '@/app/routes/routes';
import ExpensesFilterWrapper from '@/components/expense/ExpensesFilterWrapper';
import { Button } from '@/components/ui/button';
import { serverSideGuard } from '@/lib/guards/serverSide';
import { fetchAvailableYears } from '@/lib/service/expenses';
import Link from 'next/link';

const DashboardPage = async () => {
  const session = await serverSideGuard();
  const availableYears = await fetchAvailableYears(session.user.id);

  return (
    <div>
      {availableYears.length ? (
        <ExpensesFilterWrapper userId={session.user.id} years={availableYears} />
      ) : (
        <div className="m-9">No expenses found</div>
      )}

      <div className="flex justify-end z-100 fixed bottom-0 p-9 w-full">
        <Link href={routes.addExpense}>
          <Button>New Expense</Button>
        </Link>
      </div>
    </div>
  );
};

export default DashboardPage;
