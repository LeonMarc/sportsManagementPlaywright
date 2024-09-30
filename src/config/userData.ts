import { generateUniqueEmail, generateUsername, generatePassword } from '../utils/userUtils';

export const newUser = {
  username: generateUsername(),
  email: generateUniqueEmail(),
  password: generatePassword(),
  roles: ['ROLE_ADMIN'],
};
