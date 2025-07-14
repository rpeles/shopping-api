import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItem } from './cart-item.entity';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { Product } from '../product/product.entity'; 
import { User } from '../user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CartItem, Product, User]),
  ],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule {}
