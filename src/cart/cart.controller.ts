import {
  Controller,
  Get,
  UseGuards,
  Request,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AuthGuard } from '@nestjs/passport';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { ChangeQuantityDto } from './dto/change-quantity.dto';
import { RemoveFromCartDto } from './dto/remove-from-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getCart(@Request() req) {
    return this.cartService.getCartForUser(req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('add')
  addProductToCart(@Request() req, @Body() body: AddToCartDto) {
    return this.cartService.addToCart(
      req.user.userId,
      body.productId,
      body.quantity,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('change')
  changeProductQuantity(@Request() req, @Body() body: ChangeQuantityDto) {
    return this.cartService.changeQuantity(
      req.user.userId,
      body.productId,
      body.quantity,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('remove')
  removeFromCart(@Request() req, @Body() body: RemoveFromCartDto) {
    return this.cartService.removeFromCart(req.user.userId, body.productId);
  }
}
