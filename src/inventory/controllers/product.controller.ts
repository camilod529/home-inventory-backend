import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { AuthGuard } from '@nestjs/passport';
// import { GetUser } from '../../auth/decorators/get-user.decorator';
// import { User } from '../../auth/entities/user.entity';

@Controller('products')
@UseGuards(AuthGuard())
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(
    @Body() createProductDto: CreateProductDto /*, @GetUser() user: User*/,
  ) {
    return this.productService.create(createProductDto /*, user*/);
  }
}
