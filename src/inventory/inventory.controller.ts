// src/inventory/inventory.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { User } from 'src/auth/entities/user.entity';

@Controller('inventory')
@Auth()
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post()
  create(
    @Body() createInventoryDto: CreateInventoryDto,
    @GetUser() user: User,
  ) {
    return this.inventoryService.create(createInventoryDto, user);
  }
}
