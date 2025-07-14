import { IsInt, IsPositive } from 'class-validator';

export class ChangeQuantityDto {
  @IsInt()
  productId: number;

  @IsInt()
  @IsPositive()
  quantity: number;
}
