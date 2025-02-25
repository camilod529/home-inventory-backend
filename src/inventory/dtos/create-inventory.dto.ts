import { IsString, IsNotEmpty } from 'class-validator';

export class CreateInventoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
