import { z } from 'zod';

export const LoginFormSchema = z.object({
  username: z
    .string()
    .refine((val) => val, { message: 'Please enter a valid username' }),
  password: z
    .string()
    .refine((value) => value, { message: 'Please enter your password' }),
});

export type LoginFormProps = z.infer<typeof LoginFormSchema>;
