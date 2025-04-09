import ExpensesFilterWrapper from '@/components/expense/ExpensesFilterWrapper';
import { serverSideGuard } from '@/lib/guards/serverSide';
import { fetchAvailableYears } from '@/lib/service/expenses';

const DashboardPage = async () => {
  const session = await serverSideGuard();
  const availableYears = await fetchAvailableYears(session.user.id);

  return (
    <div>
      <ExpensesFilterWrapper userId={session.user.id} years={availableYears} />
    </div>
  );
};

export default DashboardPage;
