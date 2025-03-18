'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { addExpense } from '@/lib/server-actions/expense.serverAction';
import { useActionState } from 'react';

export function ExpenseForm() {
  const [state, formAction, isPending] = useActionState(addExpense, null);

  return (
    <form action={formAction} className="space-y-4 max-w-md mx-auto p-4 border rounded-lg">
      <div>
        <label className="block font-medium">金額</label>
        <Input type="number" name="amount" step="0.01" placeholder="金額を入力" required />
      </div>

      <div>
        <label className="block font-medium">説明</label>
        <Input type="text" name="description" placeholder="例: ランチ代" required />
      </div>

      <div>
        <label className="block font-medium">カテゴリ</label>
        <Input type="text" name="category" placeholder="例: 食費" required />
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending ? '追加中...' : '支出を追加'}
      </Button>

      {state?.error && <p className="text-red-500">{state.error}</p>}
      {state?.success && <p className="text-green-500">{state.success}</p>}
    </form>
  );
}
