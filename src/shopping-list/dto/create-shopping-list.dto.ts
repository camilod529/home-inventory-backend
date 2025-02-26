import { IsNotEmpty, IsUUID, Length } from 'class-validator';

export class CreateShoppingListDto {
  @IsNotEmpty()
  @Length(3, 50)
  name: string;

  @IsUUID()
  inventoryId: string;
}
