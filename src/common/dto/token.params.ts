import { IsNotEmpty, IsString } from 'class-validator';

export class TokenParams {
  @IsNotEmpty()
  @IsString()
  token: string;
}
