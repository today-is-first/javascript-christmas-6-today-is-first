import { Console } from '@woowacourse/mission-utils';
import {
  MENU,
  PRINT_MESSAGES,
  MONTH_EVENT_RULES,
} from '../constant/Constants.js';

const OutputView = {
  printMenu(menus) {
    Console.print(PRINT_MESSAGES.orderedMenu);
    menus.forEach((menu) =>
      Console.print(PRINT_MESSAGES.menu(menu[0], menu[1])),
    );
  },
  printBeforeDiscountCost(menus) {
    let beforeDiscountCost = 0;
    Console.print(PRINT_MESSAGES.beforeDiscountCost);
    menus.forEach((menu) =>
      Object.keys(MENU).forEach((type) => {
        if (MENU[type][menu[0]]) {
          beforeDiscountCost += MENU[type][menu[0]] * Number(menu[1]);
        }
      }),
    );
    Console.print(PRINT_MESSAGES.costSplit(beforeDiscountCost));
    return beforeDiscountCost;
  },

  printGiftMenu(beforeDiscountCost) {
    Console.print(PRINT_MESSAGES.giftMenu);
    if (beforeDiscountCost >= MONTH_EVENT_RULES.giftEventThreshold) {
      Console.print(
        PRINT_MESSAGES.menu(
          MONTH_EVENT_RULES.gift[0],
          MONTH_EVENT_RULES.gift[2],
        ),
      );
      return MONTH_EVENT_RULES.gift[1];
    }
    Console.print(PRINT_MESSAGES.nothing);
  },
};

export default OutputView;
