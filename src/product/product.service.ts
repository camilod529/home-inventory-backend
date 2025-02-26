import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Inventory } from 'src/inventory/entities/inventory.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Inventory)
    private readonly inventoryRepository: Repository<Inventory>,
  ) {}

  async createProduct(createProductDto: CreateProductDto) {
    const { inventoryId, ...productData } = createProductDto;

    const inventory = await this.inventoryRepository.findOne({
      where: { id: inventoryId },
    });
    if (!inventory) throw new NotFoundException('Inventory not found');

    const product = this.productRepository.create({
      ...productData,
      inventory,
    });

    return this.productRepository.save(product);
  }

  async getInventoryProducts(inventoryId: string) {
    return this.productRepository.find({
      where: { inventory: { id: inventoryId } },
      relations: ['inventory'],
    });
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) throw new NotFoundException('Product not found');

    Object.assign(product, updateProductDto);
    return this.productRepository.save(product);
  }

  async deleteProduct(id: string) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) throw new NotFoundException('Product not found');

    await this.productRepository.remove(product);
  }
}
