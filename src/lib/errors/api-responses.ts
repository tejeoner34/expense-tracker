export type ApiErrors = {
  [key: string]: string;
};

export const apiErrors: ApiErrors = {
  CredentialsSignin: 'Invalid credentials',
  userAlreadyExists: 'User already exists',
  userNotFound: 'User not found',
  invalidLogin: 'Invalid login',
};
