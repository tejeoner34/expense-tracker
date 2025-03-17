import { renderHook, act, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useSignUp } from '@/app/hooks/useSignUp';
import { createMockResponse } from '../_utils';

// Mocking useRouter
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mocking fetch API
global.fetch = jest.fn();

describe('useSignUp Hook', () => {
  const mockPush = jest.fn();
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient(); // Create a new instance for each test
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    jest.clearAllMocks();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  test('should call API and navigate on success', async () => {
    (fetch as jest.Mock).mockResolvedValue(
      createMockResponse({ id: 1, email: 'test@example.com' })
    );

    const { result } = renderHook(() => useSignUp(), { wrapper });

    await act(async () => {
      result.current.signUp({ email: 'test@example.com', password: 'password123' });
    });

    expect(fetch).toHaveBeenCalledWith('/api/user', expect.any(Object));
    expect(mockPush).toHaveBeenCalledWith('/sign-in');
    expect(result.current.error).toBe(null);
  });

  test('should handle API error', async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
      json: async () => ({ message: 'User already exists' }),
    });

    const { result } = renderHook(() => useSignUp(), { wrapper });

    await act(async () => {
      result.current.signUp({ email: 'error@test.com', password: 'password123' });
    });

    expect(fetch).toHaveBeenCalledWith('/api/user', expect.any(Object));
    await waitFor(() => {
      expect(result.current.error).toBeInstanceOf(Error);
    });
    expect(result.current.error?.message).toBe('User already exists');
    expect(mockPush).not.toHaveBeenCalled();
  });
});
