'use client';
import { useForm } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';

const filtersSchema = z.object({
  year: z.number().min(2000).max(2100),
});

type Props = {
  years: number[];
  onFilter: (year: number) => void;
  selectedYear: number;
};

export default function ExpensesFilters({ years, onFilter, selectedYear }: Props) {
  const form = useForm<z.infer<typeof filtersSchema>>({
    resolver: zodResolver(filtersSchema),
    defaultValues: {
      year: selectedYear,
    },
  });

  const onSubmit = (values: z.infer<typeof filtersSchema>) => {
    onFilter(values.year);
  };

  const handleSelectChange = (value: string) => {
    const year = parseInt(value, 10);
    form.setValue('year', year);
    form.handleSubmit(onSubmit)();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Default Year</FormLabel>
                <FormControl>
                  <Select value={String(field.value)} onValueChange={handleSelectChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Currency" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={String(year)}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
}
