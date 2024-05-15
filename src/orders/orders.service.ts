import { Injectable } from '@nestjs/common';

import { SumTotalPriceDto } from './dto/sum-total-price.dto';

import { MenuService } from '../menu/menu.service';

@Injectable()
export class OrdersService {
  constructor(private menuService: MenuService) {}

  sumTotalPrice(dto: SumTotalPriceDto): { totalPrice: number } {
    const { menuItems, isMember } = dto;
    if (menuItems.length < 1) {
      return { totalPrice: 0 }
    }
    const menu = this.menuService.getALlMenu();

    let totalPrice = menuItems.reduce((prev, current) => {
      const currentMenu = menu.find(item => item.name === current.name);

      let sumItemPrice = currentMenu.price * current.qty;
      if (currentMenu.isSpecialBundlePrice && current.qty > 1) {
        const bundleCount = Math.floor(current.qty / 2);
        const bundlePrice = currentMenu.price * 2;
        const totalBundlePrice = bundlePrice * bundleCount;
        const bundleDiscount = totalBundlePrice * 0.05;
        const leftoverCount = current.qty - (bundleCount * 2);
        sumItemPrice = (currentMenu.price * leftoverCount) + (totalBundlePrice - bundleDiscount);
      }

      return prev + sumItemPrice;
    }, 0);

    if (isMember) {
      const memberDiscount = totalPrice * 0.1;
      totalPrice -= memberDiscount;
    }

    return { totalPrice };
  }
}
