import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsInt,
  IsUUID,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNotEmpty()
  @IsInt()
  quantity: number;

  @IsNotEmpty()
  @IsString()
  unit: string;

  @IsOptional()
  expirationDate?: Date;

  @IsNotEmpty()
  @IsUUID()
  inventoryId: string;
}
