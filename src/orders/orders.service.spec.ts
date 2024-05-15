import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { SumTotalPriceDto } from './dto/sum-total-price.dto';
import { MenuName } from '../menu/enums';
import { MenuModule } from '../menu/menu.module';

describe('OrdersService', () => {
  let service: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MenuModule],
      providers: [OrdersService],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return correct total price, for single menu', () => {
    const mockPayload: SumTotalPriceDto = {
      menuItems: [
        { name: MenuName.BLUE_SET, qty: 1 },
      ],
    };

    const result = service.sumTotalPrice(mockPayload);

    expect(result.totalPrice).toEqual(30);
  });

  it('should return correct total price, for multiple menu', () => {
    const mockPayload: SumTotalPriceDto = {
      menuItems: [
        { name: MenuName.BLUE_SET, qty: 1 },
        { name: MenuName.RED_SET, qty: 3 },
      ],
    };

    const result = service.sumTotalPrice(mockPayload);

    expect(result.totalPrice).toEqual(180);
  });

  it('should return correct total price, for a bundle of special menu', () => {
    const mockPayload: SumTotalPriceDto = {
      menuItems: [
        { name: MenuName.PINK_SET, qty: 2 },
      ],
    };

    const result = service.sumTotalPrice(mockPayload);

    expect(result.totalPrice).toEqual(152);
  });

  it('should return correct total price, for multiple of bundles of special menu', () => {
    const mockPayload: SumTotalPriceDto = {
      menuItems: [
        { name: MenuName.ORANGE_SET, qty: 5 },
      ],
    };

    const result = service.sumTotalPrice(mockPayload);

    expect(result.totalPrice).toEqual(576);
  });

  it('should return correct total price, for mixed of menu', () => {
    const mockPayload: SumTotalPriceDto = {
      menuItems: [
        { name: MenuName.ORANGE_SET, qty: 5 },
        { name: MenuName.PINK_SET, qty: 1 },
        { name: MenuName.YELLOW_SET, qty: 2 },
      ],
    };

    const result = service.sumTotalPrice(mockPayload);

    expect(result.totalPrice).toEqual(756);
  });

  it('should return correct total price, for member', () => {
    const mockPayload: SumTotalPriceDto = {
      menuItems: [
        { name: MenuName.ORANGE_SET, qty: 5 },
        { name: MenuName.PINK_SET, qty: 1 },
        { name: MenuName.YELLOW_SET, qty: 2 },
      ],
      isMember: true,
    };

    const result = service.sumTotalPrice(mockPayload);

    expect(result.totalPrice).toEqual(680.4);
  });
});
