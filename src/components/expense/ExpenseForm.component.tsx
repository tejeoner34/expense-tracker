'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { addExpense } from '@/lib/server-actions/expense.serverAction';
import { useActionState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { currencies } from '@/data/currencies';
import { useSession } from 'next-auth/react';

export function ExpenseForm() {
  const { data } = useSession();
  const user = data?.user as { categories: string[] } | undefined;

  const [state, formAction, isPending] = useActionState(addExpense, null);

  return (
    <form action={formAction} className="space-y-4 max-w-md mx-auto p-4 border rounded-lg">
      <div>
        <label className="block font-medium">Amount</label>
        <Input type="number" name="amount" step="0.01" placeholder="0.00" required />
      </div>

      <div>
        <label className="block font-medium">Description</label>
        <Input type="text" name="description" placeholder="Monthly rent" required />
      </div>

      <div>
        <label className="block font-medium">Category</label>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {user &&
              user.categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block font-medium">Currency</label>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Currency" />
          </SelectTrigger>
          <SelectContent>
            {currencies.map((currency) => (
              <SelectItem key={currency} value={currency}>
                {currency}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending ? '追加中...' : '支出を追加'}
      </Button>

      {state?.error && <p className="text-red-500">{state.error}</p>}
      {state?.success && <p className="text-green-500">{state.success}</p>}
    </form>
  );
}
