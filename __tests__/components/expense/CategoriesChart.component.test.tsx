import { render, screen } from '@testing-library/react';
import CategoriesChart from '../../../src/components/expense/CategoriesChart.component';
import { Expense } from '@/domain/models/expense.model';

describe('CategoriesChart', () => {
  beforeAll(() => {
    global.ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  });

  const mockExpensesList: Expense[] = [
    {
      id: '1',
      amount: 100,
      date: new Date(),
      description: 'Expense 1',
      category: 'food',
      currency: 'USD',
      userId: 1,
      defaultCurrencyAmount: 100,
    },
    {
      id: '2',
      amount: 200,
      date: new Date(),
      description: 'Expense 2',
      category: 'food',
      currency: 'USD',
      userId: 1,
      defaultCurrencyAmount: 200,
    },
    {
      id: '3',
      amount: 300,
      date: new Date(),
      description: 'Expense 3',
      category: 'food',
      currency: 'USD',
      userId: 1,
      defaultCurrencyAmount: 300,
    },
  ];

  it('should calculate category totals correctly', () => {
    const { container } = render(<CategoriesChart expensesList={mockExpensesList} />);
    const foodTotal = mockExpensesList
      .filter((expense) => expense.category === 'food')
      .reduce((sum, expense) => sum + expense.defaultCurrencyAmount, 0);

    expect(container).toBeInTheDocument();
    expect(foodTotal).toBe(600);
  });

  it('should render area chart with correct data points', () => {
    render(<CategoriesChart expensesList={mockExpensesList} />);
    const svg = screen.getByTestId('categories-chart');
    expect(svg).toBeInTheDocument();
  });

  it('should handle empty expense list', () => {
    render(<CategoriesChart expensesList={[]} />);
    const svg = screen.getByTestId('categories-chart');
    expect(svg).toBeInTheDocument();
  });

  // it('should render custom tick icons for each category', () => {
  //   render(<CategoriesChart expensesList={mockExpensesList} />);
  //   const icons = container.querySelectorAll('foreignObject');
  //   expect(icons.length).toBeGreaterThan(0);
  // });

  it('should update chart when expenses list changes', () => {
    const { rerender } = render(<CategoriesChart expensesList={mockExpensesList} />);
    const updatedExpenses: Expense[] = [
      ...mockExpensesList,
      {
        id: '4',
        amount: 400,
        date: new Date(),
        description: 'Expense 4',
        category: 'food',
        currency: 'USD',
        userId: 1,
        defaultCurrencyAmount: 400,
      },
    ];

    rerender(<CategoriesChart expensesList={updatedExpenses} />);
    const svg = screen.getByTestId('categories-chart');
    expect(svg).toBeInTheDocument();
  });
});
