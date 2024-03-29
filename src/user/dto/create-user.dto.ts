import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Invalid email' })
  readonly email: string;

  @Length(8, 20, {
    message:
      'Password must be minimum 8 chars long and maximum 20 characters long',
  })
  readonly password: string;

  @IsNotEmpty({ message: 'This field can not be empty' })
  readonly firstName: string;

  @IsString({ message: 'Field must be a string' })
  @IsOptional()
  readonly lastName?: string;
}
