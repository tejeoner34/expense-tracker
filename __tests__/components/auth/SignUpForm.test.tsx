import '@testing-library/jest-dom';
import { render, screen, fireEvent, act } from '@testing-library/react';
import SignUpForm from '@/components/auth/SignUpForm';
import { useSignUp } from '@/app/hooks/useSignUp';

// Mock useSignUp
jest.mock('@/app/hooks/useSignUp', () => ({
  useSignUp: jest.fn().mockReturnValue({
    signUp: jest.fn(),
    error: null,
    isLoading: false,
  }),
}));

describe('SignUpForm', () => {
  it('renders email and password fields', () => {
    render(<SignUpForm />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('displays validation errors when fields are empty', async () => {
    render(<SignUpForm />);

    fireEvent.submit(screen.getByRole('button', { name: /sign up/i }));

    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/password is required/i)).toBeInTheDocument();
  });

  it('calls signUp function when form is submitted with valid data', async () => {
    const mockSignUp = jest.fn();
    (useSignUp as jest.Mock).mockReturnValue({
      signUp: mockSignUp,
      error: null,
      isLoading: false,
    });
    render(<SignUpForm />);

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: 'test@example.com' },
      });
    });

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/password/i), {
        target: { value: 'password123' },
      });
    });

    await act(async () => {
      fireEvent.submit(screen.getByRole('button', { name: /sign up/i }));
    });

    expect(mockSignUp).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
  });

  it('should match the snapshot', () => {
    const { asFragment } = render(<SignUpForm />);
    expect(asFragment()).toMatchSnapshot();
  });
});
