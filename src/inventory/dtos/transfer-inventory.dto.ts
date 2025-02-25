import { IsUUID } from 'class-validator';

export class TransferInventoryDto {
  @IsUUID()
  newOwnerId: string;
}
