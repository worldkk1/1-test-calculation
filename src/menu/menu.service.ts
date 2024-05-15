import { Injectable } from '@nestjs/common';

import { Menu } from './entities/menu.entity';
import { MenuName } from './enums';

@Injectable()
export class MenuService {
  private menu: Menu[] = [
    { name: MenuName.RED_SET, price: 50, isSpecialBundlePrice: false },
    { name: MenuName.GREEN_SET, price: 40, isSpecialBundlePrice: true },
    { name: MenuName.BLUE_SET, price: 30, isSpecialBundlePrice: false },
    { name: MenuName.YELLOW_SET, price: 50, isSpecialBundlePrice: false },
    { name: MenuName.PINK_SET, price: 80, isSpecialBundlePrice: true },
    { name: MenuName.PURPLE_SET, price: 90, isSpecialBundlePrice: false },
    { name: MenuName.ORANGE_SET, price: 120, isSpecialBundlePrice: true },
  ];

  getALlMenu(): Menu[] {
    return this.menu;
  }
}
