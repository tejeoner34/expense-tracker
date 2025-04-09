import { fetchExpensesByYear } from '@/lib/service/expenses';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const userId = searchParams.get('userId');
  const year = Number(searchParams.get('year'));

  if (!userId || isNaN(year)) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }

  const expenses = await fetchExpensesByYear(userId, year);
  return NextResponse.json(expenses);
}
