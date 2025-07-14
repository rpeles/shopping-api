import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getProductsByCategory(@Query('categoryId') categoryId: string) {
    return this.productService.findByCategory(Number(categoryId));
  }
}
