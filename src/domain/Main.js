import { Console } from '@woowacourse/mission-utils';
import InputView from '../util/InputView.js';
import OutputView from '../util/OutputView.js';
import {
  CHRISTMAS_EVENT_RULES,
  MONTH_EVENT_RULES,
  PRINT_MESSAGES,
  MENU,
} from '../constant/Constants.js';

class Main {
  constructor() {
    this.advantageCost = 0;
  }
  async start() {
    Console.print(PRINT_MESSAGES.intro);
    this.date = await InputView.readDate();
    this.menu = await InputView.readMenu();
    Console.print(PRINT_MESSAGES.outtro(this.date));
    OutputView.printMenu(this.menu);
    this.BeforeDiscountCost = OutputView.printBeforeDiscountCost(this.menu);
    this.advantageCost += OutputView.printGiftMenu(this.BeforeDiscountCost);
    this.discount();
    Console.print(this.advantageCost);
  }
  discount() {
    this.christmasEvent();
    if (
      !((this.date - MONTH_EVENT_RULES.firstFriday) % 7) ||
      !((this.date - MONTH_EVENT_RULES.firstSaturday) % 7)
    ) {
      this.weekendDiscount(this.menu);
    } else if (
      (this.date - MONTH_EVENT_RULES.firstFriday) % 7 &&
      (this.date - MONTH_EVENT_RULES.firstSaturday) % 7
    ) {
      this.weekdayDiscount(this.menu);
    }
  }
  christmasEvent() {
    if (this.date <= CHRISTMAS_EVENT_RULES.rangeMax) {
      this.advantageCost += CHRISTMAS_EVENT_RULES.totalDiscount(this.date);
    }
  }
  weekdayDiscount(menus) {
    let discountAmount = 0;
    menus.forEach((menu) => {
      if (MENU.desert[menu[0]]) {
        discountAmount += menu[1];
      }
    });
    this.advantageCost += MONTH_EVENT_RULES.weekdayDiscount * discountAmount;
  }

  weekendDiscount(menus) {
    let discountAmount = 0;
    menus.forEach((menu) => {
      if (MENU.main[menu[0]]) {
        discountAmount += menu[1];
      }
    });
    this.advantageCost += MONTH_EVENT_RULES.weekdayDiscount * discountAmount;
  }
}

const main = new Main();
main.start();
