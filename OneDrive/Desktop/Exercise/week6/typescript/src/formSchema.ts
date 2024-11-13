import { z } from 'zod';

export const formSchema = z
  .object({
    fullName: z.string().min(1, { message: "Full Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/!/, { message: "Password must include '!' character" }),
    confirmPassword: z.string().min(1, { message: "Confirm Password is required" }),
    age: z.number().min(18, { message: "You must be at least 18" }),
    dateOfBirth: z.preprocess((arg) => arg ? new Date(arg as string) : null, z.date().nullable()),
    phoneNumber: z.string().length(10, { message: "Phone Number must be 10 digits" }),
    address: z.string().min(10, { message: "Address must be at least 10 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type FormValues = z.infer<typeof formSchema>;
