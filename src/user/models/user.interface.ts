import { IProfile } from "@src/profile/models/profile.interface";

export interface IUser {
  id: number;
  email: string;
  password: string;
  isActive: boolean;
  profile: IProfile;
}
