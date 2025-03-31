import { z } from 'zod';

const baseUserSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z.string().min(1, 'password is required'),
});

export const userSchemaSignIn = baseUserSchema;

export const userSchemaSignUp = baseUserSchema.extend({
  defaultCurrency: z.string().min(1, 'Default currency is required'),
});
