'use server';

import { expenseSchema } from '@/domain/schemas/expense.schema';
import { db } from '../db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getConvertedValue } from '../service/currencyConverter';
import { Currency } from '@/domain/models/expense.model';

export async function addExpense(
  state: { error: string; success?: undefined } | { success: boolean; error?: string } | null,
  formData: FormData
) {
  const amount = parseFloat(formData.get('amount') as string);
  const description = formData.get('description') as string;
  const category = formData.get('category') as string;
  const currency = formData.get('currency') as Currency;
  if (!amount || !description || !category || !currency) {
    return { success: false, error: 'データベースエラー' };
  }

  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    const defaultCurrencyAmount = await getConvertedValue(currency, amount);
    const expense = expenseSchema.parse({
      userId,
      category,
      amount,
      currency,
      description,
      defaultCurrencyAmount,
    });
    await db.expense.create({
      data: expense,
    });

    return { success: true, expense };
  } catch (error) {
    console.log(error);
    return { success: false, error: 'データベースエラー' };
  }
}
