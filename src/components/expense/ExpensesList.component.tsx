import { Expense } from '@/domain/models/expense.model';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { formatCurrency } from '@/lib/formatting/numbers';

type Props = {
  expensesList: Expense[];
};

export default function ExpensesList({ expensesList }: Props) {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Expense</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Currency</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expensesList.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell className="font-medium">{expense.description}</TableCell>
              <TableCell>{expense.category}</TableCell>
              <TableCell>{expense.currency}</TableCell>
              <TableCell className="text-right">
                {formatCurrency(expense.amount, expense.currency)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
