import Link from 'next/link';
import { AuthButton } from '../auth/AuthButton.component';
import { routes } from '@/app/routes/routes';

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4">
      <nav>
        <Link
          href={routes.dashboard}
          className="relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-black after:origin-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-left"
        >
          Dashboard
        </Link>
      </nav>
      <AuthButton />
    </header>
  );
}
