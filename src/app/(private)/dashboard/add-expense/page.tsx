import { ExpenseForm } from '@/components/expense/ExpenseForm.component';

export default function ExpensesPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">支出を追加</h1>
      <ExpenseForm />
    </div>
  );
}
