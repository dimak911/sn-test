import { IsNotEmpty, IsString } from 'class-validator';

export class IdParams {
  @IsNotEmpty()
  @IsString()
  id: string;
}
