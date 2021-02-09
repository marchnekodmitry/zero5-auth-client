import instance from './instance';
import { IUser } from './models/user';

// eslint-disable-next-line import/prefer-default-export
export const me = () => instance.get<IUser>('/me');
