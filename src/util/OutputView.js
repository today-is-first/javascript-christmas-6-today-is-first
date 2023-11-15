import { Console } from '@woowacourse/mission-utils';
import {
  MENU,
  PRINT_MESSAGES,
  MONTH_EVENT_RULES,
  EVENT_NAME,
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
      return [EVENT_NAME.gift, MONTH_EVENT_RULES.gift[1]];
    }
    Console.print(PRINT_MESSAGES.nothing);
    return [PRINT_MESSAGES.nothing, 0];
  },

  printAdvantageList(advantageList) {
    Console.print(PRINT_MESSAGES.advantageList);
    if (!advantageList.reduce((acc, cur) => (acc += cur[1]), 0)) {
      Console.print(PRINT_MESSAGES.nothing);
    }
    advantageList.forEach((advantage) => {
      if (advantage[1]) Console.print(PRINT_MESSAGES.advantage(advantage));
    });
  },

  printTotalAdvantageCost(advantageList) {
    Console.print(PRINT_MESSAGES.totalAdvantageCost);
    let totalCost = advantageList.reduce((acc, cur) => (acc -= cur[1]), 0);
    Console.print(PRINT_MESSAGES.costSplit(totalCost));
  },
};

export default OutputView;
