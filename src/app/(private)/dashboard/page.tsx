import { routes } from '@/app/routes/routes';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const DashboardPage = async () => {
  return (
    <div>
      <div className="flex justify-end z-100 fixed bottom-0 p-9 w-full">
        <Link href={routes.addExpense}>
          <Button>New Expense</Button>
        </Link>
      </div>
    </div>
  );
};

export default DashboardPage;
