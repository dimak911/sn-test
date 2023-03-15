import { IsNotEmpty } from 'class-validator';

export class VerifyTokenParams {
  @IsNotEmpty()
  token: string;
}
