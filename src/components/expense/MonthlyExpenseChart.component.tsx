'use client';

import { Expense } from '@/domain/models/expense.model';
import { getMonthlyDataSorted } from '@/lib/formatting/monthlydata';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type Props = {
  expensesList: Expense[];
};

export default function MonthlyExpenseChart({ expensesList }: Props) {
  const monthlyData = getMonthlyDataSorted(expensesList);
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#8884d8" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
