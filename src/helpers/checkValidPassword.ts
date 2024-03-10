import { compareSync } from 'bcryptjs';

export const checkValidPassword = (password: string, hash: string) => {
  return compareSync(password, hash);
};
