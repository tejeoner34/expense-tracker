'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

type UseFilterProps = {
  userId: string;
  initialYear: number;
};

export function useFilter({ userId, initialYear }: UseFilterProps) {
  const [selectedYear, setSelectedYear] = useState(initialYear);

  const {
    data: expenses = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['expenses', userId, selectedYear],
    queryFn: async () => {
      const res = await fetch(`/api/expenses?userId=${userId}&year=${selectedYear}`);
      if (!res.ok) throw new Error('Failed to fetch expenses');
      return res.json();
    },
    refetchOnWindowFocus: false,
  });

  return {
    selectedYear,
    setSelectedYear,
    expenses,
    isLoading,
    isError,
    refetch,
  };
}
