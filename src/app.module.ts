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
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Category, Product, CartItem],
      synchronize: true,
      options: { encrypt: false },
      extra: {
        instanceName: 'SQLEXPRESS',
      },
    }),
    TypeOrmModule.forFeature([User, Category, Product, CartItem]),
    AuthModule,
    CategoryModule,
    ProductModule,
    CartModule,
    SeedModule,
  ],
})
export class AppModule {}
