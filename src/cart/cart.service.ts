import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItem } from './cart-item.entity';
import { Repository } from 'typeorm';
import { Product } from '../product/product.entity';
import { User } from '../user/user.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartItem)
    private cartRepo: Repository<CartItem>,
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async getCartForUser(userId: number) {
    return this.cartRepo.find({
      where: { user: { id: userId } },
      relations: ['product'],
    });
  }

  async addToCart(userId: number, productId: number, quantity: number) {
    const product = await this.productRepo.findOne({
      where: { id: productId },
    });
    if (!product) throw new Error('Product not found');

    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new Error('User not found');
    let cartItem = await this.cartRepo.findOne({
      where: {
        user: { id: userId },
        product: { id: productId },
      },
    });

    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cartItem = this.cartRepo.create({
        user,
        product,
        quantity,
      });
    }

    return this.cartRepo.save(cartItem);
  }

  async changeQuantity(userId: number, productId: number, quantity: number) {
    const cartItem = await this.cartRepo.findOne({
      where: {
        user: { id: userId },
        product: { id: productId },
      },
    });

    if (!cartItem) {
      throw new Error('Item not found in cart');
    }

    cartItem.quantity = quantity;
    return this.cartRepo.save(cartItem);
  }

  async removeFromCart(userId: number, productId: number) {
    const cartItem = await this.cartRepo.findOne({
      where: {
        user: { id: userId },
        product: { id: productId },
      },
    });

    if (!cartItem) {
      throw new NotFoundException('Item not found in cart');
    }

    await this.cartRepo.remove(cartItem);
    return { message: 'Item removed from cart' };
  }
}
