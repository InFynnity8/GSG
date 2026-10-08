-- Double opt-in: new subscribers are PENDING until they confirm by email.
ALTER TYPE "SubscriberStatus" ADD VALUE IF NOT EXISTS 'PENDING';
