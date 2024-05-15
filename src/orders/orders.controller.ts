import { Controller, Post, Body } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { SumTotalPriceDto } from './dto/sum-total-price.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('sum')
  sumTotalPrice(@Body() dto: SumTotalPriceDto) {
    return this.ordersService.sumTotalPrice(dto);
  }
}
