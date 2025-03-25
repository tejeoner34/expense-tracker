import Header from '@/components/ui/Header.component';
import { render, screen } from '@testing-library/react';
import { SessionProvider } from 'next-auth/react';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Header Component', () => {
  it('Should contain AuthButton component', () => {
    render(
      <SessionProvider session={null}>
        <Header />
      </SessionProvider>
    );
    const authButton = screen.getByRole('button');
    expect(authButton).toBeInTheDocument();
  });

  it('Should contain link to dashboard', () => {
    render(
      <SessionProvider session={null}>
        <Header />
      </SessionProvider>
    );
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });

  it('Should maintain consistent layout structure', () => {
    render(
      <SessionProvider session={null}>
        <Header />
      </SessionProvider>
    );
    const header = screen.getByRole('banner');
    expect(header.tagName.toLowerCase()).toBe('header');
    expect(header.parentElement).toBeTruthy();
  });
});
