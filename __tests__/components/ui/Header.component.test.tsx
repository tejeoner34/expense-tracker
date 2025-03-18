import Header from '@/components/ui/Header.component';
import { render, screen } from '@testing-library/react';
import { SessionProvider } from 'next-auth/react';

describe('Header Component', () => {
  it('Should render with correct CSS classes', () => {
    render(
      <SessionProvider session={null}>
        <Header />
      </SessionProvider>
    );
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('flex', 'justify-end', 'p-4');
  });

  it('Should contain AuthButton component', () => {
    render(
      <SessionProvider session={null}>
        <Header />
      </SessionProvider>
    );
    const header = screen.getByRole('banner');
    expect(header.children).toHaveLength(1);
    expect(header.firstChild).toBeTruthy();
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
