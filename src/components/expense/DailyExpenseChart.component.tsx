'use client';

import { Expense } from '@/domain/models/expense.model';
import { getDailyData } from '@/lib/formatting/dailyData';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

type Props = {
  expensesList: Expense[];
};

export default function DailyExpenseChart({ expensesList }: Props) {
  const dailyData = getDailyData(expensesList);

  const formatXAxis = (tick: string, index: number) => {
    const date = new Date(tick);
    const day = date.getDate();
    const isFirst = index === 0;
    const isFifteenth = day === 15;
    const isLast = index === dailyData.length - 1;

    if (isFirst || isFifteenth || isLast) {
      return `${date.getMonth() + 1}/${day}`;
    }
    return '';
  };

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={dailyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <defs>
            <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8884d8" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#8884d8" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tickFormatter={formatXAxis} interval="preserveStartEnd" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="total" stroke="#8884d8" fill="url(#colorExpense)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
