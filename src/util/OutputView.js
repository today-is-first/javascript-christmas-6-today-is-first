import { Console } from '@woowacourse/mission-utils';
import { MENU, PRINT_MESSAGES } from '../constant/Constants.js';

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
  },
  // ...
};

export default OutputView;
