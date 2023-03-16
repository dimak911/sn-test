import { IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class IdParams {
  @Transform(({ value }) => Number(value))
  @IsNotEmpty()
  @IsString()
  id: number;
}
