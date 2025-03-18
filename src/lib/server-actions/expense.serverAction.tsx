'use server';

import { expenseSchema } from '@/domain/schemas/expense.schema';
import { db } from '../db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function addExpense(
  state: { error: string; success?: undefined } | { success: boolean; error?: string } | null,
  formData: FormData
) {
  const amount = parseFloat(formData.get('amount') as string);
  const description = formData.get('description') as string;
  const category = formData.get('category') as string;
  const currency = formData.get('currency') as string;

  if (!amount || !description || !category || !currency) {
    return { success: false, error: 'データベースエラー' };
  }

  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    const expense = expenseSchema.parse({
      userId,
      category: formData.get('category'),
      amount: Number(formData.get('amount')),
      currency: formData.get('currency'),
      date: formData.get('date'),
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
