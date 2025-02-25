import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { Auth, GetUser } from 'src/auth/decorators';
import { User } from 'src/auth/entities/user.entity';
import {
  CreateInventoryDto,
  JoinInventoryDto,
  UpdateInventoryDto,
} from './dtos';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post()
  @Auth()
  createInventory(
    @Body() createInventoryDto: CreateInventoryDto,
    @GetUser() user: User,
  ) {
    return this.inventoryService.createInventory(createInventoryDto, user);
  }

  @Get(':id')
  @Auth()
  getInventoryById(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser() user: User,
  ) {
    return this.inventoryService.getInventoryById(id, user);
  }

  @Get()
  @Auth()
  getUserInventories(@GetUser() user: User) {
    return this.inventoryService.getUserInventories(user);
  }

  @Post('join')
  @Auth()
  joinInventory(
    @Body() joinInventoryDto: JoinInventoryDto,
    @GetUser() user: User,
  ) {
    return this.inventoryService.joinInventory(joinInventoryDto, user);
  }

  @Patch(':id')
  @Auth()
  updateInventory(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateInventoryDto: UpdateInventoryDto,
    @GetUser() user: User,
  ) {
    return this.inventoryService.updateInventory(id, updateInventoryDto, user);
  }

  @Delete(':id')
  @Auth()
  deleteInventory(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser() user: User,
  ) {
    return this.inventoryService.deleteInventory(id, user);
  }

  @Delete(':id/members/:memberId')
  @Auth()
  removeMember(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('memberId', ParseUUIDPipe) memberId: string,
    @GetUser() user: User,
  ) {
    return this.inventoryService.removeMember(id, memberId, user);
  }

  @Delete(':inventoryId/leave')
  @Auth()
  leaveInventory(
    @Param('inventoryId', ParseUUIDPipe) inventoryId: string,
    @GetUser() user: User,
  ) {
    return this.inventoryService.leaveInventory(inventoryId, user);
  }
}
