import { IsString, IsOptional } from 'class-validator';

export class CreateInventoryDto {
  @IsString()
  name: string;

  @IsString()
  unique_code: string;

  @IsString()
  @IsOptional()
  optional_password?: string;
}
