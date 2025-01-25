// src/inventory/inventory.service.ts
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventory } from './entities/inventory.entity';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private readonly inventoryRepository: Repository<Inventory>,
  ) {}

  async create(
    createInventoryDto: CreateInventoryDto,
    user: User,
  ): Promise<Inventory> {
    const existing = await this.inventoryRepository.findOne({
      where: { unique_code: createInventoryDto.unique_code },
    });

    if (existing) {
      throw new ConflictException(
        `Inventory with code ${createInventoryDto.unique_code} already exists`,
      );
    }

    const inventory = this.inventoryRepository.create({
      ...createInventoryDto,
      created_at: new Date(),
      created_by: user,
      users: [user],
    });
    return this.inventoryRepository.save(inventory);
  }
}
