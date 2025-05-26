import { z } from 'zod';

export const phoneRegex = /^\+?1?\d{9,15}$/;

export const userSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(phoneRegex, 'Invalid phone number'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
});

export const businessSchema = z.object({
  name: z.string().min(2, 'Business name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(phoneRegex, 'Invalid phone number'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  category: z.enum(['salon', 'barbershop', 'cafe', 'restaurant'])
});

export const rewardSchema = z.object({
  name: z.string().min(3, 'Reward name must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  type: z.enum(['discount', 'freeItem', 'service']),
  pointsRequired: z.number().min(1, 'Points required must be at least 1'),
  expiryDays: z.number().min(1, 'Expiry days must be at least 1')
});