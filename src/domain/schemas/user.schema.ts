import { z } from 'zod';

export const userSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(1, 'Password must have than 8 characters'),
});
