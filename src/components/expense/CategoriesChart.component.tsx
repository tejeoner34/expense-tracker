'use client';
import { Expense, expenseCategories } from '@/domain/models/expense.model';
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

export default function CategoriesChart({ expensesList }: Props) {
  const categoryTotals = expenseCategories.map((category) => {
    const total = expensesList
      .filter((expense) => expense.category === category.id)
      .reduce((sum, expense) => sum + expense.defaultCurrencyAmount, 0);

    return {
      category: category.name,
      total,
      Icon: category.icon,
    };
  });

  const CustomTick = ({ x, y, payload }: any) => {
    const { value } = payload;
    const category = categoryTotals.find((c) => c.category === value);
    if (!category) return null;

    const Icon = category.Icon;

    return (
      <g transform={`translate(${x},${y})`}>
        <foreignObject x={-12} y={0} width={24} height={24}>
          <Icon size={20} />
        </foreignObject>
      </g>
    );
  };

  return (
    <div data-testid="categories-chart">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={categoryTotals} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" tick={<CustomTick />} />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="total" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
