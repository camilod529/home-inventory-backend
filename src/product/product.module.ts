import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { InventoryModule } from 'src/inventory/inventory.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    InventoryModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
