import { AuthButton } from '../auth/AuthButton.component';

export default function Header() {
  return (
    <header className="flex justify-end p-4">
      <AuthButton />
    </header>
  );
}
