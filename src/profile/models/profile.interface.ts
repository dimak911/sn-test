import { IUser } from '@src/user/models/user.interface';

export interface IProfile {
  readonly id: number;
  readonly firstName: string;
  readonly lastName: string;
  readonly avatar: string;
  readonly description: string;
  readonly user: IUser;
}
