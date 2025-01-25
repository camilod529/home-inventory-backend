import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { CreateProductDto } from '../dto/create-product.dto';
// import { User } from '../../auth/entities/user.entity';
import { Inventory } from '../entities/inventory.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Inventory)
    private readonly inventoryRepository: Repository<Inventory>,
  ) {}

  async create(
    createProductDto: CreateProductDto,
    // user: User,
  ): Promise<Product> {
    const inventory = await this.inventoryRepository.findOne({
      where: { id: createProductDto.inventoryId },
    });
    if (!inventory) {
      throw new Error('Inventory not found');
    }

    const product = this.productRepository.create({
      ...createProductDto,
      inventory,
    });
    return this.productRepository.save(product);
  }
}
