import { Console } from '@woowacourse/mission-utils';
import { PRINT_MESSAGES } from '../constant/Constants.js';

const OutputView = {
  printMenu(menus) {
    Console.print(PRINT_MESSAGES.orderedMenu);
    menus.forEach((menu) =>
      Console.print(PRINT_MESSAGES.menu(menu[0], menu[1])),
    );
  },
  // ...
};

export default OutputView;
