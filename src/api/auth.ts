import instance from './instance';
import { ICredentials, ITokenCredentials } from './models/auth';
// import { IUser } from './models/user';

export const signUp = (data: ICredentials) => instance.post('/auth/sign-up', data);

export const signIn = (data: Pick<ICredentials, 'email' | 'password'>) => instance.post('/auth/login', data);

export const signOn = (data: ITokenCredentials) => instance.post<{
  accessToken: string;
  refreshToken: string;
  tokenType: string;
}>('/auth/sign-on', data);
