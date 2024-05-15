import { MenuName } from '../../menu/enums'

class MenuItem {
  name: MenuName;
  qty: number;
}

export class SumTotalPriceDto {
  menuItems: MenuItem[];
  isMember?: boolean;
}
