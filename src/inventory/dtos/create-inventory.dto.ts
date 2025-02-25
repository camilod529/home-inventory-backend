import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateInventoryDto {
  @ApiProperty({ description: 'Name of the inventory' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
