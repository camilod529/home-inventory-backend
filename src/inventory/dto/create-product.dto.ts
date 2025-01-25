import { IsString, IsInt, IsUUID, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsUUID()
  inventoryId: string;

  @IsInt()
  @IsOptional()
  current_quantity?: number;

  @IsInt()
  @IsOptional()
  minimum_quantity?: number;

  @IsUUID()
  categoryId: string;
}
