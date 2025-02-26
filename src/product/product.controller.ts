import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Auth } from 'src/auth/decorators';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @Auth()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  @Get(':inventoryId')
  @Auth()
  getInventoryProducts(
    @Param('inventoryId', ParseUUIDPipe) inventoryId: string,
  ) {
    return this.productService.getInventoryProducts(inventoryId);
  }

  @Patch(':id')
  @Auth()
  updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  @Auth()
  deleteProduct(@Param('id', ParseUUIDPipe) id: string) {
    return this.productService.deleteProduct(id);
  }
}
