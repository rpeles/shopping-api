import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../category/category.entity';
import { Product } from '../product/product.entity';
import { User } from '../user/user.entity';
import { CartItem } from '../cart/cart-item.entity';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(CartItem)
    private cartRepo: Repository<CartItem>,
  ) {}

  async onApplicationBootstrap() {
    const existingCategories = await this.categoryRepo.find();
    if (existingCategories.length > 0) {
      console.log('Seed: skipping (already has data)');
      return;
    }

    // משתמש
    const user = this.userRepo.create({
      username: 'rachel',
      password: '1234',
    });
    await this.userRepo.save(user);

    // קטגוריות
    const cat1 = this.categoryRepo.create({ name: 'Books' });
    const cat2 = this.categoryRepo.create({ name: 'Clothing' });
    await this.categoryRepo.save([cat1, cat2]);

    // מוצרים
    const p1 = this.productRepo.create({ name: 'The Hobbit', price: 50, category: cat1 });
    const p2 = this.productRepo.create({ name: 'JavaScript Guide', price: 100, category: cat1 });
    const p3 = this.productRepo.create({ name: 'T-shirt', price: 30, category: cat2 });

    await this.productRepo.save([p1, p2, p3]);

    // 🛒 פריטים לסל
    const item1 = this.cartRepo.create({
      user,
      product: p1,
      quantity: 2,
    });

    const item2 = this.cartRepo.create({
      user,
      product: p3,
      quantity: 1,
    });

    await this.cartRepo.save([item1, item2]);

    console.log('✅ Seed data inserted, including cart items');
  }
}
