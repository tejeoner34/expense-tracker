import '@testing-library/jest-dom';

// Mock Next.js router globally
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    pathname: '/mock-path',
  }),
}));
