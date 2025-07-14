import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../category/category.entity';
import { Product } from '../product/product.entity';
import { User } from '../user/user.entity';
import { CartItem } from '../cart/cart-item.entity';
import { SeedService } from './seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Product, User, CartItem])],
  providers: [SeedService],
})
export class SeedModule {}
