import * as bcrypt from 'bcryptjs';

const ROUNDS = 12;

export const hashPassword = (plain: string) => bcrypt.hash(plain, ROUNDS);

export const verifyPassword = (plain: string, hash: string) =>
  bcrypt.compare(plain, hash);

// Compared against when the email doesn't exist, so a login attempt takes the
// same time either way (prevents account enumeration by timing).
export const DUMMY_HASH =
  '$2b$12$C6UzMDM.H6dfI/f/IKcEeO5L7f7v0Dcv1pYVmpzM2uM7pS6n3Q1vS';
