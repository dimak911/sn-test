import { IsEmail, Length } from 'class-validator';

export class LoginUserDto {
  @IsEmail({}, { message: 'Invalid email' })
  readonly email: string;

  @Length(8, 20, {
    message:
      'Password must be minimum 8 chars long and maximum 20 characters long',
  })
  readonly password: string;
}
