'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-6 px-4 text-center">
      <h1 className="text-3xl sm:text-4xl font-bold">Welcome to the Expense tracker</h1>
      <p className="text-muted-foreground text-sm sm:text-base">
        Track your expenses the best way possible.
      </p>
      <Link href="/dashboard">
        <Button size="lg">My Dashboard</Button>
      </Link>
    </main>
  );
}
