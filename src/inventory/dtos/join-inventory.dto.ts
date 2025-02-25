import { IsString, IsNotEmpty } from 'class-validator';

export class JoinInventoryDto {
  @IsString()
  @IsNotEmpty()
  code: string;
}
