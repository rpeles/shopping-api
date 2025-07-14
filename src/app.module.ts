import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { Category } from './category/category.entity';
import { Product } from './product/product.entity';
import { CartItem } from './cart/cart-item.entity';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { SeedModule } from './seed/seed.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      username: 'sa',
      password: 'MyStrongPass123!',
      database: 'shopping_db',
      entities: [User, Category, Product, CartItem],
      synchronize: true,
      options: { encrypt: false },
      extra: {
        instanceName: 'SQLEXPRESS',
      }
    }),
    TypeOrmModule.forFeature([User, Category, Product, CartItem]),
    AuthModule,
    CategoryModule,
    ProductModule,
    CartModule,
    SeedModule
  ],
})
export class AppModule {}



